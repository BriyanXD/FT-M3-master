"use strict";
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

module.exports = $Promise;

function $Promise(executor) {
  if (typeof executor !== "function") throw new TypeError("executor function");
  this._state = "pending";
  this._handlerGroups = [];
  executor(this._internalResolve.bind(this), this._internalReject.bind(this));
}
$Promise.prototype._internalResolve = function (data) {
  if (this._state === "pending") {
    this._state = "fulfilled";
    this._value = data;
    this._callHandlers();
  }
};
$Promise.prototype._internalReject = function (data) {
  if (this._state === "pending") {
    this._state = "rejected";
    this._value = data;
    this._callHandlers();
  }
};
$Promise.prototype._callHandlers = function () {
  while (this._handlerGroups.length) {
    const hanlder = this._handlerGroups.shift();
    if (this._state == "fulfilled") {
      if (hanlder.successCb) {
        try {
          const result = hanlder.successCb(this._value);
          if (result instanceof $Promise) {
            return result.then(
              (value) => hanlder.downstreamPromise._internalResolve(value),
              (error) => hanlder.downstreamPromise._internalReject(error)
            );
          } else {
            hanlder.downstreamPromise._internalResolve(result);
          }
        } catch (error) {
          hanlder.downstreamPromise._internalReject(error);
        }
      } else {
        hanlder.downstreamPromise._internalResolve(this._value);
      }
    } else if (this.successCb === "rejected") {
      if (hanlder.errorCb) {
        try {
          const result = hanlder.errorCb(this._value);
          if (result instanceof $Promise) {
            return result.then(
              (value) => hanlder.downstreamPromise._internalResolve(value),
              (error) => hanlder.downstreamPromise._internalReject(error)
            );
          } else {
            hanlder.downstreamPromise._internalResolve(result);
          }
        } catch (error) {
          hanlder.downstreamPromise._internalReject(error);
        }
      } else {
        hanlder.downstreamPromise._internalReject(this._value);
      }
    }
  }
};
$Promise.prototype.then = function (successCb, errorCb) {
  if (typeof successCb !== "fuction") successCb = false;
  if (typeof errorCb !== "fuction") errorCb = false;
  const downstreamPromise = new $Promise(() => {});
  this._handlerGroups.push({
    successCb,
    errorCb,
    downstreamPromise,
  });
  if (this._state !== "pending") this._callHandlers();
  return downstreamPromise;
};

$Promise.prototype.catch = function (errorCb) {
  return this.then(null, errorCb);
};
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;
Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/

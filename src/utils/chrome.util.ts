import { Chrome } from '../models/chrome.model';
import { useState, useEffect } from 'react';
import { Callback } from '../models/general.model'

export function onRequest<T = any>
    (
        action: Chrome.Action,
        callback: (payload: T) => void,
        setSender?: (sender: chrome.runtime.MessageSender) => void,
        setCallback?: (cb: Function) => void
    ) {

    return (request: Chrome.Request<T>, sender: chrome.runtime.MessageSender, cb: Function) => {
        const { payload: extra, action: reqAction } = request;
        if (action == reqAction && callback) {
            callback(extra)
            if (setSender) {
                setSender(sender)
            }

            if (setCallback) {
                setCallback(cb);
            }
        }


    }
}



export default class ChromeListener<T = any> {
    private _callback: Callback<T>;
    private _value: T;
    private _listener: (payload: any) => void;
    private _sendMessage: (action: Chrome.Action, payload: any) => {};

    public sender: chrome.runtime.MessageSender;


    constructor(
        public readonly type: 'POPUP' | 'CONTENT',
        private action: Chrome.Action
    ) {
        this.initChromeListener(this.action);
    }

    private initChromeListener(action: Chrome.Action) {
        this._listener = payload => {
            this.value = payload;
        };
        switch (this.type) {
            case 'POPUP':
                chrome.extension.onRequest.addListener(
                    onRequest(
                        action,
                        this._listener.bind(this),
                        this.setSender.bind(this),
                        this.setSendMessage
                    )
                );
                break;

            case 'CONTENT':
                chrome.runtime.onMessage.addListener(onRequest(
                    action,
                    this._listener.bind(this),
                    this.setSender.bind(this),
                    this.setSendMessage
                ))
                break;
        }

    }

    private setSender(sender: chrome.runtime.MessageSender) {
        this.sender = sender;
    }

    private setSendMessage = (cb: Function) => {
        this._sendMessage = cb as any;
    }

    private setCallback(cb: Callback<T>) {
        this._callback = cb;
        if (this._callback) {
            this._callback(this._value)
        }
    }

    set value(v: T) {
        this._value = v;
        if (this._callback) {
            this._callback(this._value)
        }
    }

    get value() {
        return this._value;
    }

    subscribe(cb: Callback<T>) {
        this.setCallback(cb);
        return this;
    }

    unsubscribe() {
        this.setCallback(null);
    }

    next(action: Chrome.Action) {
        this.action = action;
        chrome.extension.onRequest.removeListener(this._listener);
        this.initChromeListener(this.action);
    }

    sendMessage = <J = T>(payload: J) => {
        const _req = {
            action: this.action,
            payload
        };
        if (this._sendMessage) {
            this._sendMessage(_req.action, _req.payload);
        } else {
            switch (this.type) {
                case 'POPUP':
                    chrome.tabs.query(
                        { active: true, windowType: "normal", currentWindow: true },
                        (tabArray) => {
                            tabArray.forEach(tab => {
                                chrome.tabs.sendMessage(tab.id, _req);
                            });
                        })
                    break;

                case 'CONTENT':
                    chrome.extension.sendRequest(_req);
                    break;
            }



        }
    }



}


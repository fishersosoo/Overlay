/*
 * @Author: Souma
 * @LastEditTime: 2021-08-18 18:23:48
 */
"use strict";
import { TTS } from "../../../resources/TTS.js";
let party = [];
addOverlayListener("LogLine", (e) => {});
addOverlayListener("PartyChanged", (e) => {});
startOverlayEvents();
TTS("123");

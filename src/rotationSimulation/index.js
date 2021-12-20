"use strict";
import { statusForCN } from "../../resources/data/statusForCN.js";
import { getJobByID } from "../../resources/data/job.js";
import { status } from "../../resources/data/status.js";
import "../../resources/function/loadComplete.js";
import "./index.scss";
let params = new URLSearchParams(new URL(window.location).search);



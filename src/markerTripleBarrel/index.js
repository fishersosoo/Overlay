import { sortParty } from "../../resources/function/sortParty";
import { sortRule } from "../../resources/data/sortRule";

let playerID = "";
let party = [];
let params = new URLSearchParams(new URL(window.location).search);
let sortRuleUsed = params.get("params").split(",") ?? sortRule;

addOverlayListener("ChangePrimaryPlayer", (e) => (playerID = e.charID.toString(16).toUpperCase()));

addOverlayListener("PartyChanged", (e) => {
  setTimeout(() => {
    party = e.party.filter((p) => p.inParty);
    if (party.length > 0) {
      party = sortParty(party, playerID, sortRuleUsed);
    }
  }, 1000);
});

startOverlayEvents();
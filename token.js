"use strict";

import fetch from "node-fetch";
import fs from "fs";
import * as dotenv from "dotenv";

dotenv.config();

class TokenFile {
  clientBaseURL = process.env.CLIENT_BASE_URL;
  clientID = process.env.CLIENT_ID;
  clientSecret = process.env.CLIENT_SECRET;
  redirectURI = process.env.REDIRECT_URI;
  code = process.env.CODE;

  saveTokenFile = "token.json";

  async getTokenAndRefreshToken() {
    const url = `${this.clientBaseURL}/oauth2/access_token`;
    const grantType = "authorization_code";

    const bodyData = {
      client_id: this.clientID,
      client_secret: this.clientSecret,
      code: this.code,
      grant_type: grantType,
      redirect_uri: this.redirectURI,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();
      return data;
    } catch (e) {
      console.log(
        `Error occurred when exchange authorization code for token and refresh token\n${e}`
      );
    }
  }

  async saveTokenAndRefreshToken() {
    const data = await this.getTokenAndRefreshToken();

    if (
      data.hint == "Authorization code has expired" ||
      data.hint == "Authorization code has been revoked"
    ) {
      console.log("Renew your authorization code !");
      return null;
    }

    fs.writeFileSync(this.saveTokenFile, JSON.stringify(data), function (err) {
      if (err) {
        console.log(`Error when save token \n${err}`);
        return;
      }
    });
    console.log("Write TOKEN file successfully!");
  }
}

const auth = new TokenFile();
auth.saveTokenAndRefreshToken();

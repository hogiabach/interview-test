import fetch from "node-fetch";
import fs from "fs";
import * as dotenv from "dotenv";

dotenv.config();

export class AmoCRM {
  clientBaseURL = process.env.CLIENT_BASE_URL;
  saveTokenFile = `token.json`;

  async getContact() {
    const tokenJson = JSON.parse(
      fs.readFileSync(this.saveTokenFile).toString()
    );

    const token = tokenJson.access_token;

    const queryParameters = {
      with: "leads",
      limit: "250",
    };

    const url = `${this.clientBaseURL}/api/v4/contacts?with=${queryParameters.with}&limit=${queryParameters.limit}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return [data, token];
    } catch (e) {
      console.log(`Error occurred when fetch contacts\n${e}`);
    }
  }

  async createTaskForContact() {
    const getContactItems = await this.getContact();
    const contactData = getContactItems[0];

    let contactsWithNoLeads = [];
    const contactArray = contactData._embedded.contacts;
    for (let i of contactArray) {
      let arrayLeads = i._embedded.leads;
      if (!arrayLeads.length) {
        contactsWithNoLeads.push(i.id);
      }
    }

    const url = `${this.clientBaseURL}/api/v4/tasks`;
    const token = getContactItems[1];

    try {
      for (let id of contactsWithNoLeads) {
        const bodyData = [
          {
            text: "Контакт без сделок",
            complete_till: Date.now() + 1000,
            entity_id: id,
            entity_type: "leads",
          },
        ];

        const response = await fetch(url, {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bodyData),
        });
        console.log(await response.json());
      }
    } catch (e) {
      console.log(
        `Error occurred when exchange authorization code for token and refresh token\n${e}`
      );
    }
  }
}

const amoCRM = new AmoCRM();
amoCRM.createTaskForContact();

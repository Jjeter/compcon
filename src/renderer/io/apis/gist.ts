import { Pilot } from '@/class'
import axios from 'axios'

// this token is scoped to only allow for the creation of gists on a burner account
// if this is insufficient, we'll move to a login scheme
const gistToken = atob('ZTk4MjJhZTE0MzYyMTRkNDY5YTlkZTNkMDIxMTRmODVkNTJhMjAwMg==')
const gistApi = axios.create({
  baseURL: 'https://api.github.com/gists',
  headers: {
    Authorization: 'token ' + gistToken,
  },
  responseType: 'json',
})

const changelogGistID = '3eaedde89e606f60a6346ab190972edf'
const getChangelog = function() {
  return gistApi.get(changelogGistID).then(res => res.data)
}

const newPilot = async function(pilot: Pilot): Promise<any> {
  return gistApi
    .post('', {
      files: {
        'pilot.txt': {
          content: JSON.stringify(Pilot.Serialize(pilot)),
        },
      },
      description: `${pilot.Callsign} - ${pilot.Name} (LL:${pilot.Level})`,
      public: true,
    })
    .then(res => res.data)
}

const savePilot = async function(pilot: Pilot) {
  return gistApi
    .patch(pilot.CloudID, {
      files: {
        'pilot.txt': {
          content: JSON.stringify(Pilot.Serialize(pilot)),
        },
      },
      description: `${pilot.Callsign} - ${pilot.Name} (LL:${pilot.Level})`,
    })
    .then(res => res.data)
}

const loadPilot = async function(id: string): Promise<IPilotData> {
  return gistApi.get(id).then(res => res.data)
}

export default {
  getChangelog,
  newPilot,
  savePilot,
  loadPilot,
  uploadImage: (...args) => null,
}

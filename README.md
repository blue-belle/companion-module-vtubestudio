# companion-module-vtubestudio
This is a work-in-progress module to integrate DenchiSoft's VTubeStudio with companion. Not ready to be used yet.
See [HELP.md](./companion/HELP.md) and [LICENSE](./LICENSE)

# General Approach
- [X] Authentication Flow. On startup, get a token from VTS and store it in the `config` object. Skip if token is already set
- [ ] Update to companion's API v5, with associated updates to Node and Yarn. 
- [ ] Implement some Actions, starting with [Trigger Hotkey](https://github.com/DenchiSoft/VTubeStudio#requesting-execution-of-hotkeys:~:text=trigger%20hotkeys,-in). Allow user to define which hotkey should be triggered
- [ ] Implement the [list of available hotkeys](https://github.com/DenchiSoft/VTubeStudio#requesting-list-of-hotkeys-available-in-current-or-other-vts-model) API call as a request that happens on startup (after authentication, somehow). Populate it to the Trigger Hotkey action so the user can select the hotkey from a dropdown list. 
- [ ] Does this maybe also need to be an action to manually refresh available hotkeys? I don't see why not. Beats restarting the plugin I guess
- [ ] Update the config code to actually listen to user-defined IP address and port. Default should be `127.0.0.1` and `8001`
- [ ] Find a way to implement [Hawkbat's vtubestudioJS library](https://github.com/Hawkbat/VTubeStudioJS). It's got all the API calls in it, I just need to dissect the library and find out how to smash it into this plugin. But it's easier than re-implmenting from scratch. 

# List of functions that are important to me to be implemented:
- [ ] Trigger Hotkey 
- [ ] Move model (XYZ + Rotation). Ideally this can serve as a "make the model do a barrel roll" action in Companion
- [ ] Switch models, I guess? I don't really care about this one
- [ ] [Move items within the scene](https://github.com/DenchiSoft/VTubeStudio#moving-items-in-the-scene)
- [ ] [Removing items from the scene](https://github.com/DenchiSoft/VTubeStudio#removing-item-from-the-scene)
- [ ] [Loading items into the scene](https://github.com/DenchiSoft/VTubeStudio#loading-item-into-the-scene)

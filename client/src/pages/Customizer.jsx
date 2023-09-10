import React, {useState, useEffect} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import Config from "../config/config"
import {download} from "../assets"
import {downloadCanvasToImage, reader } from "../config/helpers"
import {EditorTabs, FilterTabs, DecalTypes} from "../config/constants"
import { fadeAnimation, slideAnimation } from '../config/motion';
import { AIPicker, ColorPicker, Custombutton, FilePicker, Tabs } from '../components';
import state from '../store';


const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState('')
  const [prompt, setPrompt] = useState('')
  const [generatingImg, setGeneratingImg] = useState(false)
  const [activeEditorTab, setActiveEditorTab] = useState('')
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })

  //show tab content depending on active tab
  const generateTabContent = () =>{
    switch(activeEditorTab){
      case "colorpicker":
        return <ColorPicker />
      case "filepicker":
        return <FilePicker 
          file={file}
          setFile={setFile}
          readFile={readFile}
        />
      case "aipicker":
        return <AIPicker 
          prompt={prompt}
          setPrompt={setPrompt}
          generatingImg={generatingImg}
          handleSubmit={handleSubmit}
        />

        
      default:
        return null;
    }
  }

  const handleSubmit = async (type) =>{
    if(!prompt) return alert("Please enter a prompt");
    
    try{
      setGeneratingImg(true);

      const response = await fetch('http://localhost:8080/api/v1/pixxai', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
        })
      })

      const data = await response.json();

      handleDecals(type, `data:image/png;base64,${data.photo}`);        //the type is if we want to update the texture or the logo, then passed in the actual picture
    }catch(err){
      alert(err)
    } finally{
      setGeneratingImg(false)
      setActiveEditorTab("")
    }
  }

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if(!activeFilterTab[decalType.filterTab]){          //we want to figure out if the decal is presently active, either logo or texture
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const handleActiveFilterTab =(tabName) =>{
    switch (tabName){
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
      default:
        state.isFullTexture = true;
        state.isFullTexture = false;
    }


    //after setting the state, set the activefiltertab to update the ui

    setActiveFilterTab((prevState) =>{
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }

  const readFile = (type) =>{
    reader(file)
      .then((result) =>{          //we want to pass the file to the decal of the shirt depending on the type of image
        handleDecals(type, result);
        setActiveEditorTab("");
      })
  }

  
  return (
    <AnimatePresence>
      {!snap.intro && (               //if its not the intro page
        <>
          <motion.div
          key="custom"
          className='absolute top-0 left-0 z-10'
          {...slideAnimation('left')}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tabs 
                    key = {tab.name}
                    tab = {tab}
                    handleClick ={() => setActiveEditorTab(tab.name)}
                  />
                ))}

                {generateTabContent()}

              </div>
            </div>
          </motion.div>
          <motion.div className='absolute z-10 top-5 right-5'
            {...fadeAnimation}
          >
            <Custombutton 
            type="filled" 
            title="Go Back" 
            handleClick={ () => state.intro = true} 
            customStyles="w-fit px-4 py-2.5 font-bold text-sm"/>
          </motion.div>

          <motion.div
            className='filtertabs-container'
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tabs 
                key = {tab.name}
                tab = {tab}
                isFilterTab
                isActiveTab ={activeFilterTab[tab.name]}
                handleClick ={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer
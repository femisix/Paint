import {motion, AnimatePresence} from "framer-motion"
import {useSnapshot} from "valtio"
import state from "../store"
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from "../config/motion"
import { Custombutton } from "../components"


function Home() {
  const snap = useSnapshot(state);      //useSnapshot is a new react library which is presently holding our default react state
  return (
    <AnimatePresence>
      {snap.intro &&(
        <motion.section className="home" {...slideAnimation('left')}>
          <motion.header {...slideAnimation("down")}>
            <img 
            src="./threejs.png"
            alt="logo"
            className="w-8 h-8 0bject-contain" />
          </motion.header>

          <motion.div className="home-content" {...headContainerAnimation}>

            <motion.div {...headTextAnimation}>
              <h1 className="head-text">
                LET'S <br className="xl:block hidden" /> DO IT
              </h1>
            </motion.div>
            <motion.div
              {...headContainerAnimation}
              className="flex flex-col gap-5"
            >
              <p className="max-w-md font-normal text-gray-600 text-base">Create your unique and exclusive wears with our brand-new 3d customization tool.<strong>Unleash your imagination</strong>{" "} and define your own style.</p>

              <Custombutton 
                type="filled"
                title="Customize it"
                handleClick={() => state.intro =false}
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Home
import React, {
  Suspense,
  useContext,
  useRef,
  useMemo,
  FC,
  useState,
  useEffect,
  forwardRef,
} from "react";
import { Canvas } from "react-three-fiber";
import SpaceScene from "./components/Space";
import { Checkbox, Icon } from "semantic-ui-react";
import { Context } from "./context/Context";
import { Html } from "@react-three/drei";
import sun from "./assets/images/icons8-sun-96.png";
import earth from "./assets/images/icons8-earth-96.png";
import jupiter from "./assets/images/icons8-jupiter-64.png";
import mars from "./assets/images/icons8-mars-64.png";
import neptune from "./assets/images/icons8-neptune-64.png";
import saturn from "./assets/images/icons8-saturn-64.png";
import spaceShipPlanet from "./assets/images/icons8-spaceship-48.png";
import uranus from "./assets/images/icons8-uranus-64.png";
import fieryPlanet from "./assets/images/icons8-vaporwave-96.png";
import mecury from "./assets/images/icons8-venus-64.png";
import venus from "./assets/images/icons8-venus-64 (1).png";
import { Planetmenu, checkBoxType } from "./types";
import { Group, Object3D, Vector3 } from "three";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import useType from "./hooks/useType";
import { motion, AnimatePresence, Variants } from "framer-motion";
import bg from "./assets/images/bg.jpg";
import bluePlanet from "./assets/images/blue-planet.png";
import redPlanet from "./assets/images/red-planet.png";
import stars1 from "./assets/images/stars.png";
import stars2 from "./assets/images/stars2.png";
import spaceShip from "./assets/images/space-ship.png";
import astronout from "./assets/images/astronaut.png";
import { gsap } from "gsap";
import useLoadImage from "./hooks/useLoadImage";

const PlanetsLinks: FC<{
  planets: Planetmenu[];
  onSunClick: (ref: React.RefObject<Group>) => void;
  onPlanetClick: (
    ref: React.RefObject<Group>,
    objRef: React.RefObject<Object3D<Event>>
  ) => void;
  selectedPlanet: string | undefined;
  setSelectedPlanet: Function;
}> = ({
  planets,
  onSunClick,
  onPlanetClick,
  selectedPlanet,
  setSelectedPlanet,
}) => {
  const onClick = (planet: Planetmenu) => {
    if (planet.name === "sun") onSunClick(planet.refObj.ref);
    onPlanetClick(planet.refObj.ref, planet.refObj.objRef);

    setSelectedPlanet(planet.name);
  };
  return (
    <>
      {planets.map((planet, i) => (
        <li
          key={i}
          onClick={(e) => onClick(planet)}
          className={selectedPlanet === planet.name ? "active" : undefined}
        >
          <img src={planet.img} alt={planet.name} />
          <span>{planet.name}</span>
        </li>
      ))}
    </>
  );
};

const descriptions: Record<string, string> = {
  sun: `Imagine a gigantic ball of fire and light, so big that it can fit over a million Earths inside it! That's our amazing Sun. It's like a super bright and powerful star that lights up our entire solar system. The Sun is so strong that it gives us warmth, helps plants grow, and makes everything around us bright and colorful.\nBut did you know that the Sun is also super active? It's like a big ball of energy always dancing and moving. It throws out huge bursts of hot gas called solar flares, which can be as big as ten Earths put together! These solar flares can create beautiful lights in the sky called auroras, like a magical light show.\nBut remember, even though the Sun is fascinating and beautiful, it's also very powerful. That's why it's important to protect our eyes and skin when we're out in the Sun. So, next time you see the Sun shining, take a moment to appreciate its warmth and light, and remember how incredible and important it is for all life on Earth!`,
  mecury: `Get ready for a wild space adventure to the planet Mercury! It's like a speedy race car zooming around the Sun. During the day, it's hotter than a sizzling oven, but at night, it's colder than an ice cream truck! Mercury has lots of cool dents called craters, made by space rocks crashing into it. It even has a superpower - a strong magnetic field to protect itself. So grab your spacesuit and let's explore this tiny, mighty planet together! Who knows what we'll discover!`,
  venus: `Welcome to Venus, the ultimate hot spot in space! It's like a never-ending sauna party with thick clouds and sizzling temperatures hotter than an oven. Venus is a master of disguise, hiding its rocky surface beneath fluffy clouds. It even has acid rain showers! But don't worry, Venus still shines bright like a superstar in the sky. So get ready for a fiery adventure on this wild and fascinating planet!\nAnd here's a fun fact: Venus spins in the opposite direction compared to most planets. It's like doing a backward dance move in space! So buckle up and get ready for a cosmic journey to the planet of heat, clouds, and incredible surprises. Venus is waiting to show you its unique and fiery wonders!`,
  earth: `Welcome to planet Earth, our amazing home in the vast universe! It's like a giant playground filled with wonders and adventures.\nEarth is a truly special place because it's the only planet we know of that has life. It's like a giant puzzle with billions of pieces, where plants, animals, and humans all fit together to create a beautiful ecosystem.\nOh, and here's a fun fact: Earth loves to throw parties for different seasons! We have summer with beach days and ice cream, autumn with colorful leaves to jump in, winter with snowball fights and cozy hot cocoa, and spring with blooming flowers and chirping birds. It's like a never-ending celebration of nature's awesomeness!\nSo let's take care of our incredible planet, just like we take care of our favorite toys. By recycling, planting trees, and being kind to nature, we can help keep Earth a magical place for generations to come. Enjoy your time on this amazing playground called Earth!`,
  mars: `Welcome to Mars, the red planet of mystery and possibility! It's like a futuristic playground waiting to be explored.\nMars is known for its rusty red color, which makes it look like a big strawberry in the sky. It's a rocky planet with vast deserts and towering volcanoes. Can you imagine roving around in a cool space buggy, exploring Mars' rocky terrain?\nBut here's the best part: scientists think that Mars might have once had flowing rivers and even lakes! That means it could have been a lot like Earth, with possible habitats for alien life. How cool is that?\nMars is also home to the tallest volcano in our solar system called Olympus Mons. It's like a colossal mountain reaching way up into space. Imagine climbing that giant volcano!\nIf you ever visit Mars, you'll need a special spacesuit to protect you from its thin atmosphere and chilly temperatures. But don't worry, we're working hard to send astronauts there one day!\nSo, get ready to dream big and imagine what mysteries Mars holds. It might just be the next great frontier for exploration and adventure!`,
  saturn: `Welcome to Saturn, the most magnificent planet in our solar system! It's like a cosmic jewel box, sparkling with beauty and wonder.\nSaturn is famous for its spectacular rings, like a magical hula hoop made of ice and dust. These rings are made up of billions of tiny pieces swirling around the planet. Imagine being a space acrobat jumping through those dazzling hoops!\nBut Saturn has more surprises! It's a gas giant, which means it's mostly made of colorful gases like hydrogen and helium. And it's huge, so enormous that about 760 Earths could fit inside it. That's like having a gazillion soccer fields all in one place!\nSaturn also has many fascinating moons, like its very own entourage of friends. One of its moons, called Titan, even has rivers and lakes of liquid methane. Can you imagine swimming in a lake of methane? How cool is that?\nIf you could fly close to Saturn, you'd see gigantic storms swirling around, like a cosmic whirlwind party. And the winds there are super fast, faster than any hurricane on Earth!\nSo get ready to dream big and let your imagination soar. Saturn, with its mesmerizing rings and epic storms, is waiting to show you the wonders of our incredible universe!`,
  jupiter: `Welcome to Jupiter, the biggest and boldest planet in our solar system! It's like a giant, colorful playground with endless surprises.\nJupiter is so huge that it could fit more than 1,300 Earths inside it! It's like having a massive ball of gas floating in space. And guess what? Jupiter loves to show off its stripes. It has bands of different colors swirling around it, like a cosmic tie-dye party!\nBut that's not all—Jupiter has a great sense of adventure. It's got a whopping 79 moons! Imagine having a whole team of moons as your best buddies, each one with its own personality and story.\nAnd hold on tight, because Jupiter throws the wildest storms in the solar system. The biggest storm, called the Great Red Spot, is like a giant hurricane that's been raging for hundreds of years. That's longer than anyone you know has been alive!\nIf you could visit Jupiter, you'd need a special spaceship to handle its powerful gravity. It's like being on a super-fast roller coaster ride, but all the time!\nSo get ready to be amazed by Jupiter's colossal size, vibrant colors, and thrilling storms. It's a planet that reminds us just how grand and incredible our universe can be!`,
  uranus: `Welcome to Uranus, the funky and mysterious planet of surprises! It's like a cosmic disco ball, spinning and twirling in the depths of space.\nUranus is special because it's tilted on its side, like a planet doing a fancy dance move. It's the only planet in our solar system that spins that way. How cool is that?\nBut wait, there's more! Uranus is known for its beautiful blue-green color, like a giant minty ice cream cone. It's all thanks to the gases in its atmosphere that create this unique hue.\nUranus also has a bunch of rings, just like Saturn but much more subtle. They're like a secret accessory, adding a touch of elegance to the planet's charm.\nAnd guess what? Uranus has a gang of 27 moons, each one with its own personality and style. Imagine having a moon squad to hang out with!\nSo get ready to groove with Uranus, a planet that knows how to boogie and captivate us with its peculiar beauty. It's a world where surprises and wonders await at every turn!`,
  neptune: `Welcome to Neptune, the mysterious and icy giant of our solar system! It's like a cosmic snow globe, swirling with secrets and enchantment.\nNeptune is a beautiful blue planet, like a big blueberry floating in space. It's the farthest planet from the Sun, so it gets really chilly out there. Brrr!\nBut Neptune has an adventurous spirit. It's home to the fastest winds in the solar system, zooming around like speedy race cars. Hold onto your hat!\nAnd here's something out of this world: Neptune has a super cool moon named Triton. It's covered in icy volcanoes, which erupt with frozen gases. Can you imagine watching ice volcanoes explode?\nNeptune is also a bit of a rebel. It sometimes breaks the rules and orbits the Sun differently than the other planets. It's like a planet with its own unique style.\nSo get ready to dive into the depths of Neptune's icy wonders, where mysteries and icy adventures await. It's a planet that will leave you mesmerized and dreaming of faraway worlds!`,
  "k-09Q": `Welcome to the extraordinary world of K-09Q, a man-made fictional planet created as a backup if Earth ever gets damaged! Imagine a planet like a cosmic puzzle, built with the brightest minds and advanced technology.\nK-09Q had a grand adventure when it partially exploded, scattering its debris into space. Now, these pieces twirl around the planet like a magnificent ring of fragments. It's like a space dance party happening right above!\nEach debris piece tells a unique story, like a celestial jigsaw puzzle waiting to be solved. Some chunks may be rocky, others might sparkle like precious gems. Who knows what surprises await in this orbiting playground?\nOn K-09Q, imaginative inventors have built incredible floating cities and breathtaking landscapes. They've created floating gardens with colorful flora and fauna, and even developed fantastical creatures that roam the skies and waters.\nSo, hop on a rocket ship and get ready to explore the wonders of K-09Q! It's a planet born from human ingenuity and imagination, a place where adventure and discovery know no bounds. Let your imagination soar as you embark on an unforgettable journey to this extraordinary fictional world!`,
  "k-07R": `Welcome to the incredible world of K-07R, a man-made fictional planet created to replace the previously exploded K-09Q! It's still under development by Earth's top researchers, and it's going to be out of this world!\nPicture this: On K-07R, three-quarters of the planet's surface is covered in sizzling magma, reaching a whopping 5000 degrees Celsius! It's like living on a fiery playground where everything's hot, hot, hot! This magma acts as a super cool shield, protecting the planet from space radiations and keeping us safe.\nBut that's not all! The remaining one-quarter of K-07R is guarded by a hive-like force field that spins in a complete 360-degree rotation. It's like a dance party of protection! This force field not only keeps us safe but also keeps an eye out for any alien signals that might be floating around in space.\nGet ready for an intergalactic migration because in the nearest future, 60% of humans will be heading to K-07R! But here's the twist: we won't be living on the planet's surface like we do on Earth. Instead, our new homes will be nestled inside the planet itself, like cozy underground hideouts. Don't worry, we won't miss out on sunlight or the necessary elements for survival. The clever scientists have already figured it all out, making sure we have all we need to thrive in this exciting and unique world!\nSo strap on your space helmets and prepare for an adventure of a lifetime on K-07R. It's a planet that's being built with love, imagination, and a whole lot of fun! Get ready to explore, discover, and make K-07R our new home among the stars!`,
};

const DescriptionComponent: FC<{
  selectedPlanet: string;
  onZoomRangeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  showDescription: Function;
}> = ({ selectedPlanet, onZoomRangeChange, showDescription }) => {
  const [seeMore, setSeeMore] = useState<boolean | undefined>(undefined);
  const { typedText, isTypingComplete } = useType(
    descriptions[selectedPlanet],
    10,
    500
  );

  const variants: Variants = {
    down: {
      opacity: 0.8,
      y: 500,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0.8,
      y: 500,
    },
  };

  useEffect(() => {
    setSeeMore(undefined);
  }, [selectedPlanet]);

  return (
    <motion.div
      className="fact-container"
      variants={variants}
      initial="down"
      animate="visible"
      exit="exit"
      transition={{ bounce: false, easings: ["easeIn", "easeOut"] }}
    >
      <Icon name="cancel" onClick={() => showDescription(false)} />
      <div className="facts">
        <span className="heading">{selectedPlanet}</span>
        {descriptions[selectedPlanet]?.length > 500 ? (
          <>
            {seeMore === true ? (
              <>
                {descriptions[selectedPlanet]}&nbsp;
                {isTypingComplete && (
                  <a onClick={() => setSeeMore(false)} href="/#">
                    See less
                  </a>
                )}
              </>
            ) : seeMore === false ? (
              <>
                {typedText}&nbsp;
                {isTypingComplete && (
                  <a onClick={() => setSeeMore(true)} href="/#">
                    ...See more
                  </a>
                )}
              </>
            ) : (
              <>
                {typedText}&nbsp;
                {isTypingComplete && (
                  <a onClick={() => setSeeMore(true)} href="/#">
                    ...See more
                  </a>
                )}
              </>
            )}
          </>
        ) : (
          typedText
        )}
      </div>
      <div className="zoom">
        <span>-</span>{" "}
        <input
          type="range"
          onChange={onZoomRangeChange}
          min={1}
          max={20}
          defaultValue={5}
        />{" "}
        <span>+</span>
      </div>
    </motion.div>
  );
};

const SpaceSceneContainer = forwardRef<
  HTMLDivElement,
  {
    style: React.CSSProperties;
    className?: string;
    onCancelClick: React.MouseEventHandler<HTMLElement>;
    showScene: boolean;
  }
>(({ style, className, onCancelClick, showScene }, ref) => {
  const context = useContext(Context);
  const [selectedPlanet, setSelectedPlanet] = useState<string | undefined>(
    undefined
  );
  const [showDescriptionView, setShowDescriptionView] = useState(true);

  // SPACE BODIES REFS
  const cameraRef = useRef<any>();
  const orbitRef = useRef<OrbitControlsImpl>(null);
  const sunRef = useRef<Group>(null);
  const mecuryObjRef = useRef<Object3D<Event>>(null);
  const mecuryRef = useRef<Group>(null);
  const venusObjRef = useRef<Object3D<Event>>(null);
  const venusRef = useRef<Group>(null);
  const earthObjRef = useRef<Object3D<Event>>(null);
  const earthRef = useRef<Group>(null);
  const planetObjRef = useRef<Object3D<Event>>(null);
  const planetRef = useRef<Group>(null);
  const marsObjRef = useRef<Object3D<Event>>(null);
  const marsRef = useRef<Group>(null);
  const planetShipObjRef = useRef<Object3D<Event>>(null);
  const planetShipRef = useRef<Group>(null);
  const saturnObjRef = useRef<Object3D<Event>>(null);
  const saturnRef = useRef<Group>(null);
  const jupiterObjRef = useRef<Object3D<Event>>(null);
  const jupiterRef = useRef<Group>(null);
  const neptuneObjRef = useRef<Object3D<Event>>(null);
  const neptuneRef = useRef<Group>(null);
  const uranusObjRef = useRef<Object3D<Event>>(null);
  const uranusRef = useRef<Group>(null);
  const starsRef = useRef<Object3D<Event>>(null);
  const milkyWayRef = useRef<Group>(null);

  const planets = useMemo(
    () => [
      new Planetmenu("sun", sun, {
        ref: sunRef,
        objRef: mecuryObjRef,
      }),
      new Planetmenu("mecury", mecury, {
        ref: mecuryRef,
        objRef: mecuryObjRef,
      }),
      new Planetmenu("venus", venus, {
        ref: venusRef,
        objRef: venusObjRef,
      }),
      new Planetmenu("earth", earth, {
        ref: earthRef,
        objRef: earthObjRef,
      }),
      new Planetmenu("mars", mars, {
        ref: marsRef,
        objRef: marsObjRef,
      }),
      new Planetmenu("k-09Q", fieryPlanet, {
        ref: planetRef,
        objRef: planetObjRef,
      }),
      new Planetmenu("saturn", saturn, {
        ref: saturnRef,
        objRef: saturnObjRef,
      }),
      new Planetmenu("jupiter", jupiter, {
        ref: jupiterRef,
        objRef: jupiterObjRef,
      }),
      new Planetmenu("k-07R", spaceShipPlanet, {
        ref: planetShipRef,
        objRef: planetShipObjRef,
      }),
      new Planetmenu("uranus", uranus, {
        ref: uranusRef,
        objRef: uranusObjRef,
      }),
      new Planetmenu("neptune", neptune, {
        ref: neptuneRef,
        objRef: neptuneObjRef,
      }),
    ],
    [
      mecuryRef,
      mecuryObjRef,
      venusRef,
      venusObjRef,
      earthRef,
      earthObjRef,
      planetRef,
      planetObjRef,
      marsRef,
      marsObjRef,
      planetShipRef,
      planetShipObjRef,
      saturnRef,
      saturnObjRef,
      jupiterRef,
      jupiterObjRef,
      neptuneRef,
      neptuneObjRef,
      uranusRef,
      uranusObjRef,
    ]
  );

  const refs = {
    cameraRef,
    orbitRef,
    sunRef,
    mecuryRef,
    mecuryObjRef,
    venusRef,
    venusObjRef,
    earthRef,
    earthObjRef,
    planetRef,
    planetObjRef,
    marsRef,
    marsObjRef,
    planetShipRef,
    planetShipObjRef,
    saturnRef,
    saturnObjRef,
    jupiterRef,
    jupiterObjRef,
    neptuneRef,
    neptuneObjRef,
    uranusRef,
    uranusObjRef,
    starsRef,
    milkyWayRef,
  };

  const revolvePlanetsHandler: checkBoxType = (e, { checked }) => {
    context.setRevolve(checked || false);
  };

  const reotateBodiesHandler: checkBoxType = (e, { checked }) => {
    context.setRotate(checked || false);
  };

  const onPlanetClick = (
    ref: React.RefObject<Group>,
    objRef: React.RefObject<Object3D<Event>>
  ) => {
    if (orbitRef.current && objRef.current) {
      context.setRevolve(false);
      orbitRef.current.target = ref?.current?.position || new Vector3(0, 0, 0);
      orbitRef.current.position0 =
        ref?.current?.position || new Vector3(0, 0, 0);
      orbitRef.current.zoom0 = ref.current?.position.z || 0;

      objRef.current.rotation.x = 0;
      objRef.current.rotation.y = 0;
      objRef.current.rotation.z = 0;
    }
    orbitRef.current?.update();
  };

  const onSunClick = (ref: React.RefObject<Group>) => {
    if (orbitRef.current && ref.current && cameraRef.current) {
      orbitRef.current.target = ref?.current?.position || new Vector3(0, 0, 0);
      cameraRef.current.zoom = 1;
      cameraRef.current?.updateProjectionMatrix();
    }

    orbitRef.current?.update();
  };

  const onZoomRangeChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (e) => {
    if (cameraRef.current) {
      cameraRef.current.zoom = e.target.value;
      cameraRef.current?.updateProjectionMatrix();
    }
    console.log(e.target?.value);
    orbitRef.current?.update();
  };

  useEffect(() => {
    setShowDescriptionView(true);
  }, [selectedPlanet]);

  return (
    <div
      className={`space-scene-container ${className || ""}`}
      style={style}
      ref={ref}
    >
      <Canvas shadows>
        <Suspense
          fallback={
            <Html>
              <div style={{ color: "white" }}>Loading...</div>
            </Html>
          }
        >
          <SpaceScene refs={refs} />
        </Suspense>
      </Canvas>
      <AnimatePresence>
        {selectedPlanet && showDescriptionView && (
          <DescriptionComponent
            selectedPlanet={selectedPlanet}
            onZoomRangeChange={onZoomRangeChange}
            showDescription={setShowDescriptionView}
          />
        )}
      </AnimatePresence>
      <div className="controls" draggable>
        <div>
          <Checkbox
            slider
            label="Revolve planets"
            checked={context.revolve}
            onChange={revolvePlanetsHandler}
          />
        </div>
        <div>
          <Checkbox
            slider
            label="Rotate bodies"
            checked={context.rotate}
            onChange={reotateBodiesHandler}
          />
        </div>
        <ul>
          <PlanetsLinks
            planets={planets}
            onSunClick={onSunClick}
            onPlanetClick={onPlanetClick}
            selectedPlanet={selectedPlanet}
            setSelectedPlanet={setSelectedPlanet}
          />
        </ul>
      </div>
      {showScene && (
        <div className="icon-container" onClick={onCancelClick}>
          <i className="fas fa-xmark"></i>
        </div>
      )}
    </div>
  );
});

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <img src={astronout} alt="astronout" />
      <span>LOADING...</span>
    </div>
  );
};

const App: React.FC<{}> = () => {
  const spaceSceneContainerRef = useRef<HTMLDivElement>(null);
  const spaceSceneContainerMobileRef = useRef<HTMLDivElement>(null);
  const stars1Ref = useRef<HTMLImageElement>(null);
  const stars2Ref = useRef<HTMLImageElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const { loading } = useLoadImage({
    images: [
      bg,
      bluePlanet,
      redPlanet,
      stars1,
      stars2,
      spaceShip,
      "https://images.unsplash.com/photo-1674574124792-3be232f1957f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1688461330948-48b0f365cec7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    ],
  });

  const [showScene, setShowScene] = useState(false);

  const onExploreClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    gsap.to(spaceSceneContainerRef.current, {
      width: "100dvw",
      height: "100dvh",
      animationFillMode: "forwards",
      borderRadius: 0,
    });

    // if (window.innerWidth < 1350) {
    //   exitAnimation();

    //   setTimeout(() => setShowScene(true), 1000);
    //   return;
    // }

    setShowScene(true);
  };

  const onCancelClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (window.innerWidth > 1350)
      gsap.to(spaceSceneContainerRef.current, {
        width: "40dvw",
        height: "50dvh",
        animationFillMode: "forwards",
        borderBottomLeftRadius: 10,
      });

    setShowScene(false);
  };

  const animateObjects = () => {
    const timeline = gsap.timeline({ repeat: -1 });

    timeline.to(".object", {
      transform: "translateY(5px)",
      ease: "power.out",
    });
    timeline.to(
      ".object",
      {
        transform: "translateY(0px)",
        ease: "power.out",
      },
      ">"
    );
  };

  const animateStars = (e: MouseEvent) => {
    const distanceFromCenterX = e.clientX - window.innerWidth / 2;

    if (stars1Ref.current && stars2Ref.current) {
      gsap.to(stars1Ref.current, {
        transform: `translateX(-${
          distanceFromCenterX * Number(stars1Ref.current.dataset.speedx || 0.1)
        }px)`,
        animationFillMode: "forwards",
      });

      gsap.to(stars2Ref.current, {
        transform: `translateX(-${
          distanceFromCenterX * Number(stars2Ref.current.dataset.speedx || 0.1)
        }px)`,
        animationFillMode: "forwards",
      });
    }
  };

  const initialAnimation = () => {
    // TEXT ANIMATION
    if (textContainerRef.current) {
      Array.from(textContainerRef.current.children).forEach((elem, i) => {
        gsap.from(elem, {
          y: 50,
          opacity: 0,
          delay: i * 0.3,
        });
      });
    }
    // OBJECT ANIMATION
    const objects = document.getElementsByClassName(
      "object"
    ) as HTMLCollectionOf<HTMLImageElement>;
    Array.from(objects).forEach((object) => {
      if (object.dataset.name === "bluePlanet") {
        gsap.from(object, {
          transform: "translateX(30rem)",
          ease: "power.out",
          delay: ((object?.dataset?.index as any) || 0) * 0.3,
        });
      } else if (object.dataset.name === "redPlanet") {
        gsap.from(object, {
          transform: "translateX(-30rem)",
          ease: "power.out",
          delay: ((object?.dataset?.index as any) || 0) * 0.3,
        });
      } else if (object.dataset.name === "spaceShip") {
        gsap.from(object, {
          transform: "translateY(-30rem)",
          ease: "power.out",
          delay: ((object?.dataset?.index as any) || 0) * 0.3,
        });
      }
    });
    setTimeout(animateObjects, 2000);
  };

  const exitAnimation = () => {
    // TEXT ANIMATION
    if (textContainerRef.current) {
      Array.from(textContainerRef.current.children).forEach((elem, i) => {
        gsap.to(elem, {
          y: 50,
          opacity: 0,
          delay: i * 0.3,
          animationFillMode: "forwards",
        });
      });
    }
    // OBJECT ANIMATION
    const objects = document.getElementsByClassName(
      "object"
    ) as HTMLCollectionOf<HTMLImageElement>;
    Array.from(objects).forEach((object) => {
      if (object.dataset.name === "bluePlanet") {
        gsap.to(object, {
          transform: "translateX(30rem)",
          ease: "power.out",
          delay: ((object?.dataset?.index as any) || 0) * 0.3,
          animationFillMode: "forwards",
        });
      } else if (object.dataset.name === "redPlanet") {
        gsap.to(object, {
          transform: "translateX(-30rem)",
          ease: "power.out",
          delay: ((object?.dataset?.index as any) || 0) * 0.3,
          animationFillMode: "forwards",
        });
      } else if (object.dataset.name === "spaceShip") {
        gsap.to(object, {
          transform: "translateY(-30rem)",
          ease: "power.out",
          delay: ((object?.dataset?.index as any) || 0) * 0.3,
          animationFillMode: "forwards",
        });
      }
    });
  };

  useEffect(() => {
    initialAnimation();

    window.addEventListener("mousemove", animateStars);
    return () => {
      window.removeEventListener("mousemove", animateStars);
    };
  }, []);

  return (
    <div className="app">
      {loading ? (
        <Loader />
      ) : (
        <>
          {window.innerWidth > 1350 && (
            <SpaceSceneContainer
              style={{ width: "40dvw", height: "50dvh" }}
              ref={spaceSceneContainerRef}
              className="scace-scene-container-desktop"
              onCancelClick={onCancelClick}
              showScene={showScene}
            />
          )}
          <div className="overlay"></div>
          <img src={bg} alt="overlay" className="parallax" />
          <img
            src={stars1}
            alt="stars1"
            className="parallax stars1"
            data-speedx={0.3}
            ref={stars1Ref}
          />
          <img
            src={stars2}
            alt="stars2"
            className="parallax stars2"
            data-speedx={0.1}
            ref={stars2Ref}
          />
          <img
            src={bluePlanet}
            alt="bluePlanet"
            className="parallax object bluePlanet"
            data-index={1}
            data-name={"bluePlanet"}
          />
          <img
            src={redPlanet}
            alt="redPlanet"
            className="parallax object redPlanet"
            data-index={2}
            data-name={"redPlanet"}
          />
          <img
            src={spaceShip}
            alt="spaceShip"
            className="parallax object spaceShip"
            data-index={3}
            data-name={"spaceShip"}
          />
          <div className="text" ref={textContainerRef}>
            <span>Hi! Welcome to </span>
            <span>GOCYCLOPEDIA!</span>
            <span>
              An online encyclopaedia created with react three fiber, three js
              and React Js
            </span>
            {/* <br /> */}
            <button onClick={onExploreClick} style={{ opacity: 1 }}>
              Explore
            </button>
          </div>
          {window.innerWidth <= 1350 && showScene && (
            <SpaceSceneContainer
              style={{ width: "100dvw", height: "100dvh", borderRadius: 0 }}
              ref={spaceSceneContainerMobileRef}
              onCancelClick={onCancelClick}
              showScene={showScene}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;

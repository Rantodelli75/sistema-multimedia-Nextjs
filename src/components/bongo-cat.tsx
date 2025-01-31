"use client"

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const BongoCat = ({ backgroundColor = "#1a1e2d" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ID = "bongo-cat";
    const s = (selector: string) => `#${ID} ${selector}`;
    const notes = document.querySelectorAll(".note");

    for (let note of notes) {
      note?.parentElement?.appendChild(note.cloneNode(true));
      note?.parentElement?.appendChild(note.cloneNode(true));
    }

    const music = { note: s(".music .note") };
    const cat = {
      pawRight: {
        up: s(".paw-right .up"),
        down: s(".paw-right .down"),
      },
      pawLeft: {
        up: s(".paw-left .up"),
        down: s(".paw-left .down"),
      },
    };

    gsap.set(music.note, { scale: 0, autoAlpha: 1 });

    const animatePawState = (selector: string) =>
      gsap.fromTo(
        selector,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.01,
          repeatDelay: 0.19,
          yoyo: true,
          repeat: -1,
        }
      );

    const tl = gsap.timeline();

    tl.add(animatePawState(cat.pawLeft.up), "start")
      .add(animatePawState(cat.pawRight.down), "start")
      .add(animatePawState(cat.pawLeft.down), "start+=0.19")
      .add(animatePawState(cat.pawRight.up), "start+=0.19")
      .timeScale(1.6);

    gsap.from(".terminal-code line", {
      drawSVG: "0%",
      duration: 0.1,
      stagger: 0.1,
      ease: "none",
      repeat: -1,
    });

    const noteElFn: Function = gsap.utils.pipe(gsap.utils.toArray, gsap.utils.shuffle);
    const noteEls: HTMLElement[] = noteElFn(music.note);

    const numNotes = noteEls.length / 3;
    const notesG1 = noteEls.splice(0, numNotes);
    const notesG2 = noteEls.splice(0, numNotes);
    const notesG3 = noteEls;

    const colorizer = gsap.utils.random(["#a5ea9b", "#ff61d8", "#569cfa", "#ffcc81", "#7ed1e2", "#a3a4ec", "#67b5c0", "#fd7c6e"], true);
    const rotator = gsap.utils.random(-50, 50, 1, true);
    const dir = (amt: number) => `${gsap.utils.random(["-", "+"])}=${amt}`;

    const animateNotes = (els: HTMLElement[]): GSAPTween => {
      els.forEach((el) => {
        gsap.set(el, {
          stroke: colorizer(),
          rotation: rotator(),
          x: gsap.utils.random(-25, 25, 1),
        });
      });

      return gsap.fromTo(
        els,
        {
          autoAlpha: 1,
          y: 0,
          scale: 0,
        },
        {
          duration: 2,
          autoAlpha: 0,
          scale: 1,
          ease: "none",
          stagger: {
            from: "random",
            each: 0.5,
          },
          rotation: dir(gsap.utils.random(20, 30, 1)),
          x: dir(gsap.utils.random(40, 60, 1)),
          y: gsap.utils.random(-200, -220, 1),
          onComplete: () => {
            animateNotes(els);
          },
        }
      );
    };

    tl.add(animateNotes(notesG1)).add(animateNotes(notesG2), ">0.05").add(animateNotes(notesG3), ">0.25");
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex items-end justify-center h-screen w-screen overflow-hidden"
      style={{ backgroundColor }}
    >
      <div className="w-[80vw] h-[80vh]">
        <svg id="bongo-cat" viewBox="0 0 800 600">
          <g>
            <g className="music music-left">
              <g className="note">
                <path d="M367.3,77.8a13.1,13.1,0,0,0-5.1-1.8c-8.5-.9-18.7,7.5-18.4,16.1a12.8,12.8,0,0,0,2.6,7c3.1-3.3,6.3-6.8,9.6-10.2S363.6,81.3,367.3,77.8Z" />
              </g>
              <path className="band" d="M515,40.6c-15.9-4.6-57-14.1-104,2.3a166.9,166.9,0,0,0-60.9,37.3" />
            </g>
            <g className="music music-right">
              <g className="note">
                <g>
                  <path d="M368.5,46.5c.5,2.1,1.2,3.5,3.8,6.3s5.1,4.3,6.5,7.2a11.1,11.1,0,0,1,.7,2,10.5,10.5,0,0,1-.7,6.5" />
                  <path d="M368.5,46.5a20.8,20.8,0,0,0,2.4,11.7c2.3,4.4,5,5.4,6.8,9.5a17.5,17.5,0,0,1,.4,11" />
                  <line x1="368.5" y1="47.7" x2="368.5" y2="92.8" />
                  <path d="M368.5,92.8c.1-3.1-4.7-6.3-9-6.3s-8.7,2.7-8.7,5.8,4.8,5.7,8.7,5.8S368.3,95.8,368.5,92.8Z" />
                </g>
              </g>
              <g className="note">
                <polyline points="350 81.7 350 43.5 382.7 50.7 382.7 89.5" />
                <path d="M350,82.3c0-3.1-4.5-5.7-8.2-5.9s-9.3,2.8-9.2,6,4.7,5.7,8.6,5.7S349.9,85.5,350,82.3Z" />
                <path d="M382.7,89.9c0-3.1-4.4-5.7-8.2-5.8s-9.3,2.7-9.2,5.9,4.7,5.7,8.7,5.7S382.6,93,382.7,89.9Z" />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default BongoCat;

"use client";

import { useState, useRef, use, useEffect } from "react";
import Timer from "@/components/Timer";
import menuIcon from "@/photos/menuIcon.png";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import setUser from "./hooks/setUser";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [hourlyRate, setHourlyRate] = useState("");
  const [rate, setRate] = useState(0);
  const [showNewSession, setShowNewSession] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showRate, setShowRate] = useState(false);
  const [stop, setStop] = useState(false);

  const dateObj = new Date();
  const month = dateObj.getMonth() + 1; //months from 1-12
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();

  const newdate = day + "." + month + "." + year;

  const { addWork } = setUser();

  const hourlyRateParsed = parseInt(hourlyRate);

  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const timer: any = useRef();

  const { data: session } = useSession();

  const savetoMogno = function () {
    addWork([
      {
        id: uuidv4(),
        rate: hourlyRate,
        money: rate,
        time: time,
        date: newdate,
      },
    ]);
    window.alert("successfully saved");
  };

  useEffect(() => {
    // Preklic kaveljca, če je merjenje časa ustavljeno
    if (!running) return;

    const interval = setInterval(() => {
      // Izračunajte oceno glede na trenutno uro in urno postavko
      const currentRate = hourlyRateParsed * (time / 3600);
      setRate(currentRate);
    }, 500); // Posodabljanje ocene vsako sekundo

    // Počisti interval ob razmontiranju komponente ali ustavitvi merjenja časa
    return () => clearInterval(interval);
  }, [running, hourlyRateParsed, time]);

  return (
    <div className="trackerApp">
      <div className="header">
        <h3>HOURLY RATE TRACKER</h3>
        <button onClick={() => setShowMenu(!showMenu)}>
          <Image
            src={menuIcon}
            width={35}
            height={35}
            alt="menuIcon"
            className="menuIcon"
          />
        </button>
      </div>

      <div className={`menuShow ${showMenu ? "active" : "noactive"}`}>
        {session ? (
          <div>
            <button onClick={() => signOut()} className="menuShowLink">
              LogOut
            </button>
            <Link href="/profile" className="linkProfile">
              Profile
            </Link>
          </div>
        ) : (
          <button onClick={() => signIn("google")} className="menuShowLink">
            LogIn
          </button>
        )}
      </div>

      {session && <div className="userLogged">{session?.user?.email}</div>}

      {session ? (
        <div
          className="newSession"
          onClick={() => setShowNewSession(!showNewSession)}
        >
          {showNewSession ? "CLOSE SESSION" : "+NEW SESSION"}
        </div>
      ) : (
        <div className="newSession" onClick={() => signIn("google")}>
          LOG IN
        </div>
      )}

      {showNewSession && (
        <div className="trackerInputForm">
          <p>Enter your hourly rate:</p>
          <input
            type="text"
            placeholder="Enter rate €..."
            required
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
          />
          <div>
            <button
              onClick={() => {
                setShowRate(true);
                setRunning(true);
              }}
            >
              Start
            </button>

            <button
              onClick={() => {
                if (running) clearInterval(timer.current);
                setRunning(!running);
                setStop(!stop);
                setRate(hourlyRateParsed * (time / 3600));
              }}
            >
              {running ? "Stop" : "Resume"}
            </button>
          </div>
        </div>
      )}

      {showRate && (
        <div className="yourRate">
          <p>Rate: {rate.toFixed(2)}€</p>
          <p>
            Time:
            {
              <Timer
                running={running}
                setRunning={setRunning}
                timer={timer}
                time={time}
                setTime={setTime}
              />
            }
          </p>
        </div>
      )}

      {stop && (
        <div className="container">
          <button className="buttonSave" onClick={() => savetoMogno()}>
            SAVE
          </button>
        </div>
      )}
    </div>
  );
}

"use client";

const RateCard = ({ item, x }: any) => {
  const format = (time: number): string => {
    let hours: any = Math.floor((time / 60 / 60) % 24);
    let minutes: any = Math.floor((time / 60) % 60);
    let seconds: any = Math.floor(time % 60);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="containerRateCard">
      <div className="naslov">
        <h3>
          Tracker {x} ({item.date})
        </h3>
      </div>

      <div className="specRate">
        <div className="rate-money">
          <p>
            <span className="red">Rate: </span>
            <span className="blue">{item.rate}€/h</span>
          </p>
          <p>
            <span className="red">Money: </span>
            <span className="blue">{item.money.toFixed(2)}€</span>
          </p>
        </div>
      </div>

      <div className="specRate">
        <p>
          <span className="red">Time: </span>
          <span className="blue">{format(item.time)}</span>
        </p>
      </div>
    </div>
  );
};

export default RateCard;

import { useEffect } from "react";

const PsychosocialeChart = ({ title, value, description, compare }) => {
    const values = [value]
    useEffect(() => {
        if (window != undefined) {
            import('zingchart/index').then((zingchart) => {
                ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"];
                // window.feed = (callback) => {
                //     const tick = {};
                //     tick.plot0 = Math.ceil(alala);
                //     callback(JSON.stringify(tick));
                // };
                // window.feedCompare = (callback) => {
                //     const tick = {};
                //     tick.plot0 = Math.ceil(alala);
                //     callback(JSON.stringify(tick));
                // };
                const myConfig = {
                    type: "gauge",
                    globals: {
                        fontSize: 25,
                    },
                    plotarea: {
                        margin: 0,
                        backgroundColor: "#F9EEE8",
                    },
                    plot: {
                        size: "100%",
                        valueBox: {
                            placement: "center",
                            // text: '%v', //default
                            text: '', //default
                            fontSize: 11,
                            rules: [
                                // {
                                //   rule: '%v >= 700',
                                //   // text: '%v<br>EXCELLENT'
                                // },
                                // {
                                //   rule: '%v < 700 && %v > 640',
                                //   // text: '%v<br>Good'
                                // },
                                // {
                                //   rule: '%v < 640 && %v > 580',
                                //   // text: '%v<br>Fair'
                                // },
                                // {
                                //   rule: '%v <  580',
                                //   // text: '%v<br>Bad'
                                // }
                            ],
                        },
                    },
                    tooltip: {
                        borderRadius: 5,
                    },
                    scaleR: {
                        aperture: 180,
                        minValue: 0,
                        maxValue: 100,
                        step: 10,
                        center: {
                            visible: false,
                        },
                        tick: {
                            visible: false,
                        },
                        item: {
                            offsetR: 0,
                            rules: [
                                {
                                    rule: "%i == 9",
                                    offsetX: 15,
                                },
                            ],
                        },
                        labels: ["-", "10", "", "", "", "", "", "", "", "", "+"],
                        ring: {
                            size: 25,
                            rules: [
                                {
                                    rule: "%v <= 100",
                                    backgroundColor: "#E2CDC1",
                                },
                            ],
                        },
                    },
                    // refresh: {
                    //     type: "feed",
                    //     transport: "js",
                    //     url: !compare ? "feed()" : "feedCompare()",
                    //     interval: 100,
                    //     resetTimeout: 1000,
                    // },
                    series: [
                        {
                            values: values, // starting value
                            backgroundColor: "#FFAF81",
                            // indicator: [10, 10, 10, 10, 0.75],
                            animation: {
                                effect: 2,
                                method: 1,
                                sequence: 4,
                                speed: 900,
                            },
                        },
                    ],
                };

                zingchart.render({
                    id: !compare ? "myChart" : "myChart1",
                    data: myConfig,
                    height: "100%",
                    width: "100%",
                });
            }).catch((error) => {
                console.error(error);
            });
        }
    }, []);

    return (
        <div className="basis-1/2 flex flex-col p-4 rounded-lg items-center m-2">
            <h1 className="text-xl my-4 text-center">{title}</h1>
            <div className="font-thin text-customGray italic text-center text-xs mb-5">
                {description}
            </div>
            <div id={!compare ? "myChart" : "myChart1"} className="w-[400px] h-[175px]">
                <a className="zc-ref" href="https://www.zingchart.com/">
                </a>
            </div>
        </div>
    );
};

export default PsychosocialeChart;

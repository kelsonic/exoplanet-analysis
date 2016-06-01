
// # COLUMN pl_hostname:    Host Name
// # COLUMN pl_letter:      Planet Letter
// # COLUMN pl_discmethod:  Discovery Method
// # COLUMN pl_pnum:        Number of Planets in System
// # COLUMN pl_orbper:      Orbital Period [days]
// # COLUMN pl_orbsmax:     Orbit Semi-Major Axis [AU]
// # COLUMN pl_orbeccen:    Eccentricity
// # COLUMN pl_bmassj:      Planet Mass or M*sin(i)[Jupiter mass]
// # COLUMN st_dist:        Distance [pc]
// # COLUMN st_teff:        Effective Temperature [K]
// # COLUMN st_mass:        Stellar Mass [Solar mass]
// # COLUMN st_rad:         Stellar Radius [Solar radii]
// # COLUMN rowupdate:      Date of Last

var list = []

Papa.parse("http://localhost:3000/planets.csv", {
    download: true,
    header: true,
    worker: true,
    step: function(row) {
        list.push(row.data)
    },
    complete: function() {

        // Pulling planet discovery methods and count
        var methods = {}
        list.forEach(function(planet) {
            var pl_discmethod = planet[0]["pl_discmethod"]
            if (methods[pl_discmethod] === undefined) {
                methods[pl_discmethod] = 1;
            } else {
                methods[pl_discmethod]++;
            }
        })

        var discoveryMethodsData = []
        Object.keys(methods).forEach(function(key) {
            discoveryMethodsData.push([key, methods[key]])
        })

        $(function () {

            // Radialize the colors
            Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
                return {
                    radialGradient: {
                        cx: 0.5,
                        cy: 0.3,
                        r: 0.7
                    },
                    stops: [
                        [0, color],
                        [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
                    ]
                };
            });

            $(function () {
                $('#pie-discovery-methods').highcharts({
                    chart: {
                        type: 'pie',
                        options3d: {
                            enabled: true,
                            alpha: 45,
                            beta: 0
                        }
                    },
                    title: {
                        text: ''
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            depth: 35,
                            dataLabels: {
                                enabled: true,
                                format: '{point.name}'
                            }
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: 'Method share',
                        data: discoveryMethodsData
                    }]
                });
            });
        })


        // Grab planetary mass and orbital period data
        var massOrbitData = []
        list.forEach(function(planet) {
            var orbitalPeriod = parseFloat(planet[0]["pl_orbper"])
            var planetaryMass = parseFloat(planet[0]["pl_bmassj"])
            massOrbitData.push([orbitalPeriod, planetaryMass])
            console.log("Pushed and parsed!")
        })
        console.log(massOrbitData[0])


        $(function () {
            $('#scatter-mass-orbit').highcharts({
                chart: {
                    type: 'scatter',
                    zoomType: 'xy'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    title: {
                        enabled: true,
                        text: 'Orbital Period (days)'
                    },
                    allowDecimals: true,
                    ceiling: 10,
                    floor: 0
                },
                yAxis: {
                    title: {
                        text: 'Planetary Mass (Jupiter Masses)'
                    }
                },
                plotOptions: {
                    scatter: {
                        marker: {
                            radius: 5,
                            states: {
                                hover: {
                                    enabled: true,
                                    lineColor: 'rgb(100,100,100)'
                                }
                            }
                        },
                        states: {
                            hover: {
                                marker: {
                                    enabled: false
                                }
                            }
                        },
                        tooltip: {
                            headerFormat: '<b>{series.name}</b><br>',
                            pointFormat: '{point.x} days, {point.y} Jupiter masses'
                        }
                    }
                },
                series: [{
                    name: 'Planet',
                    color: 'rgba(223, 83, 83, .5)',
                    data: massOrbitData
                }]
            });
        });

        // Grab solar mass and solar radius
        var massOrbitData = []
        list.forEach(function(planet) {
            var orbitalPeriod = parseFloat(planet[0]["pl_orbper"])
            var planetaryMass = parseFloat(planet[0]["pl_bmassj"])
            massOrbitData.push([orbitalPeriod, planetaryMass])
            console.log("Pushed and parsed!")
        })
        console.log(massOrbitData[0])


        $(function () {
            $('#scatter-mass-orbit').highcharts({
                chart: {
                    type: 'scatter',
                    zoomType: 'xy'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    title: {
                        enabled: true,
                        text: 'Orbital Period (days)'
                    },
                    allowDecimals: true,
                    ceiling: 10,
                    floor: 0
                },
                yAxis: {
                    title: {
                        text: 'Planetary Mass (Jupiter Masses)'
                    }
                },
                plotOptions: {
                    scatter: {
                        marker: {
                            radius: 5,
                            states: {
                                hover: {
                                    enabled: true,
                                    lineColor: 'rgb(100,100,100)'
                                }
                            }
                        },
                        states: {
                            hover: {
                                marker: {
                                    enabled: false
                                }
                            }
                        },
                        tooltip: {
                            headerFormat: '<b>{series.name}</b><br>',
                            pointFormat: '{point.x} days, {point.y} Jupiter masses'
                        }
                    }
                },
                series: [{
                    name: 'Planet',
                    color: 'rgba(223, 83, 83, .5)',
                    data: massOrbitData
                }]
            });
        });


        // # COLUMN st_teff:        Effective Temperature [K]
        // # COLUMN st_mass:        Stellar Mass [Solar mass]
        // # COLUMN st_rad:         Stellar Radius [Solar radii]

        // Grab solar mass and solar radius
        var solarData1 = []
        var solarData2 = []
        list.forEach(function(planet) {
            var solarTemp = parseFloat(planet[0]["st_teff"])
            var solarMass = parseFloat(planet[0]["st_mass"])
            var solarRad = parseFloat(planet[0]["st_rad"])
            solarData1.push([solarTemp, solarMass])
            solarData2.push([solarTemp, solarRad])
            console.log("Pushed and parsed!")
        })
        console.log(solarData1[0])


        $(function () {
            $('#scatter-solar').highcharts({
                chart: {
                    type: 'scatter',
                    zoomType: 'xy'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    title: {
                        enabled: true,
                        text: 'Solar Temperature (K)'
                    },
                    allowDecimals: true,
                    ceiling: 8000,
                    floor: 2000
                },
                yAxis: {
                    title: {
                        text: 'Solar Mass (<span class="red-text">red</span>) | Solar Radii (<span class="light-blue-text">blue</span>)'
                    },
                    ceiling: 5
                },
                plotOptions: {
                    scatter: {
                        marker: {
                            radius: 5,
                            states: {
                                hover: {
                                    enabled: true,
                                    lineColor: 'rgb(100,100,100)'
                                }
                            }
                        },
                        states: {
                            hover: {
                                marker: {
                                    enabled: false
                                }
                            }
                        },
                        tooltip: {
                            headerFormat: '<b>{series.name}</b><br>',
                            pointFormat: '{point.x}K, {point.y} solar masses'
                        }
                    }
                },
                series: [{
                    name: 'Temp vs. Mass',
                    color: 'rgba(223, 83, 83, .5)',
                    data: solarData1
                },
                {
                    name: "Temp vs. Radius",
                    color: "rgba(3, 169, 244, .5)",
                    data: solarData2
                }]
            });
        });
    }
});

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var gmap;

var app = {
    
       // app global vars      
        myapp:sap.m.App,
        page1:sap.m.Page,
        page2:sap.m.Page,
        mapdiv:sap.ui.core.HTML,
        watchID:String,
        
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
                
        app.receivedEvent('deviceready');        
        
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
        /*
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        */                    
        
        // get current position
        this.watchID = navigator.geolocation.watchPosition(this.onGPSSuccess,this.onGPSError,{ enableHighAccuracy: true });  
                       
        // ui5 init
        sap.ui.getCore().attachInit(function () {
                // create a mobile app and display page1 initially
                this.myapp = new sap.m.App("myApp", {
                        initialPage: "page1"
                });
                // create the first page
                this.page1 = new sap.m.Page("page1", {
                        title : "Hello World",
                        showNavButton : false,
                        content : new sap.m.Button({
                                text : "Go to Page 2",
                                press : function () {
                                        // navigate to page2
                                        myapp.to("page2");
                                }
                        })
                });
                // maps
                this.mapdiv = new sap.ui.core.HTML("mapdiv", { content:'<div id="mapdiv">PIPPO</div>' });
                this.mapdiv.placeAt("page1");               
        // mapdiv = document.getElementById("mymap");                
        // map = new google.maps.Map(mapdiv, { center: { lat: 44.540, lng: -78.546 }, zoom: 8 } ); 
                 
                // create the second page with a back button
                this.page2 = new sap.m.Page("page2", {
                        title : "Hello Page 2",
                        showNavButton : true,
                        navButtonPress : function () {
                                // go back to the previous page
                                myapp.back();
                        }   
                });
                // add both pages to the app
                this.myapp.addPage(page1).addPage(page2);
                // place the app into the HTML document
                this.myapp.placeAt("content");        
                
        });                      
        
    },
    
    // gps ok
    onGPSSuccess: function(position) {

            // set map center
            //map.setCenter( new google.maps.LatLng(44.540,-78.546) );

            document.getElementById('mapdiv').innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                                                          'Longitude: '          + position.coords.longitude             + '<br />' +
                                                          'Altitude: '           + position.coords.altitude              + '<br />' +
                                                          'Accuracy: '           + position.coords.accuracy              + '<br />' +
                                                          'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                                                          'Heading: '            + position.coords.heading               + '<br />' +
                                                          'Speed: '              + position.coords.speed                 + '<br />' +
                                                          'Timestamp: '          + position.timestamp                    + '<br />'; 

    },
    
    // gps ko
    onGPSError: function(error) { alert('code: ' + error.code    + '\n' + 'message: ' + error.message + '\n'); }           
   
    };

app.initialize();

function mapsLoaded() { };
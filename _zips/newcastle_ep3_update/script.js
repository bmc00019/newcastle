		
		// using the youtube API to mute the player, which DFP QA
		// requires if your video autoplays
		var tag = document.createElement('script'),
		firstScript = document.getElementsByTagName('script')[0];
		tag.src = "https://www.youtube.com/iframe_api";
		firstScript.parentNode.insertBefore(tag, firstScript);

		var player;
		function onYouTubeIframeAPIReady(){
			player = new YT.Player('player', {
				events : {
					onReady : function(e){
						e.target.mute();
					}
				}
			});
		}

		(function(w, d){
			var _vice_dfp = {
				
			};

			_vice_dfp.init = function init(){
				//Check for page load, polite init
				if(Enabler.isPageLoaded()) _vice_dfp.politeInit();
				else Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, _vice_dfp.politeInit, false);
			};

			//Called when page is loaded
			_vice_dfp.politeInit = function politeInit(){

				// page is loaded, add our Enabler methods and other functionality here
				console.log('_vice_dfp.politeInit');

				Enabler.setExpandingPixelOffsets(0, 0, 1000, 400, false, false);

				// Main clickable exits
				exit_1 = document.getElementById('exit_1');
				exit_2 = document.getElementById('exit_2');
				exit_3 = document.getElementById('exit_3');
				exit_4 = document.getElementById('exit_4');
				exit_5 = document.getElementById('exit_5');
				
				// backup exit, which will be the top part of the banner
				backup_exit = document.getElementById('backup_exit');

				// Expand creative roll-over
				expand_creative = document.getElementById('expand_creative');

				// collapsed and expanded panels
				collapsed_panel = document.getElementById('collapsed_panel');
				expanded_panel = document.getElementById('expanded_panel');

				// close button
				close = document.getElementById('close');

				
				// call event listeneres function
				addListener();

				// One function to add event listeners
				function addListener() {
					collapsed_panel.addEventListener('mouseover', expandAd, false);
					expanded_panel.addEventListener('mouseover', stayExpanded, false);
					close.addEventListener('click', closeAd, false);
					collapsed_panel.addEventListener('mouseout', addExpandAdAgain, false);

					exit_1.addEventListener('click', clickExit1, false);
					exit_2.addEventListener('click', clickExit2, false);
					exit_3.addEventListener('click', clickExit3, false);
					exit_4.addEventListener('click', clickExit4, false);
					exit_5.addEventListener('click', clickExit5, false);

					backup_exit.addEventListener('click', clickBackupExit, false);


				}

				Enabler.setExpandingPixelOffsets(0, 0, 1000, 400, false, false);
				Enabler.addEventListener(studio.events.StudioEvent.EXPAND_START, expandHandler, false);
				Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_START, collapseHandler, false);

				function expandAd() {
					Enabler.requestExpand();
				}

				function collapseAd() {
					Enabler.requestCollapse();
				}			

				function expandHandler(e) {

					collapsed_panel.style.display = "none";
					expanded_panel.style.display = "block";
					Enabler.finishExpand();
					Enabler.addEventListener(studio.events.StudioEvent.EXPAND_FINISH, function() {
						// console.log('expansion finished');
			 		});
				}

				function collapseHandler(e) {
					collapsed_panel.style.display = "block";
					expanded_panel.style.display = "none";
					Enabler.finishCollapse();
					Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_FINISH, function() {
						// console.log('collapse finished');
			 		});
				}

				function stayExpanded() {
					// console.log('mouseover expanded, stayExpanded');
					expanded_panel.style.display = "block";
					collapsed_panel.style.display = "none";
				}

				function closeAd() {
					Enabler.reportManualClose();
					Enabler.close('close');
					Enabler.requestCollapse();
					collapsed_panel.removeEventListener('mouseover', expandAd, false);
					expanded_panel.style.display = "none";
					collapsed_panel.style.display = "block";
				}

				function addExpandAdAgain() {
					setTimeout( function() {
						collapsed_panel.addEventListener('mouseover', expandAd, false);
					}, 1100);
				}

				function closeAfterExit() {
					collapsed_panel.removeEventListener('mouseover', expandAd, false);
					addExpandAdAgain();
				}

				// Adding exit clicks
				function clickExit1() {
					Enabler.exit('Episode 1');
					Enabler.counter('Clicked Episode 1');
					Enabler.requestCollapse();
					closeAfterExit();
				}

				function clickExit2() {
					Enabler.exit('Episode 2');
					Enabler.counter('Clicked Episode 2');
					Enabler.requestCollapse();
					closeAfterExit();
				}

				function clickExit3() {
					Enabler.exit('Episode 3');
					Enabler.counter('Clicked Episode 3');
					Enabler.requestCollapse();
					closeAfterExit();
				}

				function clickExit4() {
					Enabler.exit('Episode 4');
					Enabler.counter('Clicked Episode 4');
					Enabler.requestCollapse();
					closeAfterExit();
				}

				function clickExit5() {
					Enabler.exit('Episode 5');
					Enabler.counter('Clicked Episode 5');
					Enabler.requestCollapse();
					closeAfterExit();
				}

				function clickBackupExit() {
					Enabler.exit('backup_exit');
					Enabler.counter('backup_exit');
					Enabler.requestCollapse();
					closeAfterExit();
				}

			};

			if(Enabler.isInitialized()) _vice_dfp.init();
			else Enabler.addEventListener(studio.events.StudioEvent.INIT, _vice_dfp.init, false);
		})(window, document);
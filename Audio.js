
var SoundManager = (function () {

    var instance;

    function createInstance() {
        return{

                loadSound:function(name,source,total){
                        for (var i = 0; i < total; i++) {
                            
                            var sound = new Audio(source);
                            sound.volume = 0.3;
                            sound.total = total;
                            sound.addEventListener('play',function(){
                                this.pause();
                                this.removeEventListener('play', arguments.callee, false);

                            });
                            sound.play();
                            instance.sounds.push({name:name,sound:sound});

                        };                
                },

                playSound:function(name){
                    if(!SOUND)return;
                    for (var i = 0; i < instance.sounds.length; i++) {
                         var music = instance.sounds[i];

                         if(music.name == name){
                            if(!music.sound.paused && music.sound.duration > 0){
                                continue;
                            }
                            music.sound.play();
                            break;
                         }
                          
                    };
                }
        }
    }

    return {

        getInstance: function () {
            if (!instance) {
                instance = createInstance();
                instance.sounds = [];
            }
            return instance;
        }
    };
})();
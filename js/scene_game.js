/*
 *　ゲームシーン
 */
var createGameScene = function() {

	var scene = new Scene();
	scene.backgroundColor = BACKGROUND_COLLOR;

    // Spaceキーを登録
    if ( global.keybindFlag ){
        global.game.keybind( 32, "space" );
        global.game.addEventListener( "spacebuttondown", function() { scene.ontouchstart(); });
        global.keybindFlag = false;
    }

    // startを再生
    global.sound.start.play();

    // プレイヤーを作成
    global.player = new Player();

    // ファウンダーを作成
    var kashimaPet	 = new KashimaPet();
    var kitazawaPet	 = new KitazawaPet();
    var ohmaePet	 = new OhmaePet();

    // ファウンダーアイテムの個数をカウント
    var founderItemCount = 0;

    // クリア後のウィンドウ遅延用
    // onenterframeで使用
    var clearCount = 0;

    // グローバル変数の初期化
    global.score = 0;
    global.founder = 0;
    global.progress = 0;
    global.game.frame = 1500;

    // 背景処理
    var background = new Sprite( BACKGROUND_WIDTH, BACKGROUND_HEIGHT );
    background.image = global.game.assets[ IMAGE_BACKGROUND1 ];
    background.moveTo( 0, 0 );
    background.state = 1;       // 現在の背景画像の番号
    background.move = true;     // 背景を動かすフラグ
    background.onenterframe = function() {
    	// スクロール
        if ( background.move ) {
            this.x -= GAME_SPEED / 2;
            // 端まで行ったら戻す
            if (this.x <= - ( BACKGROUND_WIDTH - SCREEN_WIDTH ) ) {

                switch ( background.state ){
                    case 1:         // 背景：町
                        if ( global.progress > 0.3 ) {
                            background.image = global.game.assets[ IMAGE_BACKGROUND2 ];
                            background.state = 2;
                        }
                        break;
                    case 2:         // 背景：グラデ
                        background.image = global.game.assets[ IMAGE_BACKGROUND3 ];
                        background.state = 3;
                        break;
                    case 3:         // 背景：森
                        if ( global.progress >= 0.8 ){
                            background.image = global.game.assets[ IMAGE_BACKGROUND4 ];
                            background.state = 4;
                        }
                        break;
                }
            	background.moveTo( 0, 0 );
            }

            // 死亡判定
            if ( global.player.state == 2 ) {
                background.move = false;
            }

            // ゴール判定
            if ( background.state == 4 && this.x < -960 ){
                background.move = false;
                global.player.state = 3;
                global.sound.bgm.stop();
                global.sound.clear.play();
            }

        }
    };
    scene.addChild( background );

	// シーン開始時の処理
	scene.onenter = function() {

		// ゲームフレームを初期化
		global.game.frame = 0;

        // 進捗を初期化
        global.progress = 0;

		// プレイヤーを表示
		scene.addChild( global.player );

        // ファウンダーを表示
        scene.addChild( kashimaPet );
        scene.addChild( kitazawaPet );
        scene.addChild( ohmaePet );

        // 進捗バーを表示
        progressGroup1 = new Group();
        progressGroup2 = new Group();
        progressGroup3 = new Group();
        progressGroup1.addChild( new ProgressBack() );
        progressGroup1.addChild( new ProgressBox() );
        progressGroup2.addChild( new ProgressBar() );
        progressGroup3.addChild( new ProgressPanda() );
        scene.addChild( progressGroup1 );
        scene.addChild( progressGroup2 );
        scene.addChild( progressGroup3 );

        // スコアを表示
        var progressLabel = new Label();
        progressLabel.font = "48px Tahoma";
        progressLabel.color = "#054aa7";
        progressLabel.moveTo( 715, 500 );
        progressLabel.onenterframe = function() {
            this.text = createScoreText( global.score );
        };
        scene.addChild( progressLabel );

        if ( debug.isDebug() ) {
            dbgLabel = new Label();
            dbgLabel.color = "white";
            dbgLabel.moveTo( 10, 10 );
            dbgLabel.onenterframe = function() {
                dbgLabel.text = Math.floor( global.progress * 100 ) + " %";
            };
            scene.addChild( dbgLabel );
        }

    };

    // 画面タッチ時の処理
    scene.ontouchstart = function(){
        if( global.player.state == 1 && !global.player.isJump() ){
            global.player.jump();
            if ( kashimaPet.exist )
                kashimaPet.jump();
            if ( kitazawaPet.exist )
                kitazawaPet.jump();
            if ( ohmaePet.exist )
                ohmaePet.jump();
        }
    };

    // フレーム更新時の処理
    scene.onenterframe = function() {

        // ゲームのリミット確認
        if ( global.player.state == 1 && global.game.frame < GAME_TIME_LIMIT ) {

        	// アイテム生成•表示
            if ( global.game.frame % 50 == 0 ) {
                var item;
                if ( ( randfloat(0, 2) | 0) == 0 ) {
        		    item = new Heart();
                } else {
                    item = new Drink();
                } 
                item.moveTo( SCREEN_WIDTH + 30, PLAYER_POS_Y - PLAYER_JUMP + randInt( 30 , PLAYER_HEIGHT * 2 ));
                scene.addChild( item );
            }
		
        	if ( founderItemCount == 0 && Math.floor(global.progress * 100) == 25 ) {
        	    var item2 = new Founder1();
                item2.onhit = function(){
                    this.parentNode.removeChild(this);
                    global.score += FOUNDER_POINT;
                    kitazawaPet.insert( ++global.founder );
                    global.sound.item.play();
                };
                item2.moveTo( SCREEN_WIDTH + 30, PLAYER_POS_Y - PLAYER_JUMP - PLAYER_HEIGHT * 0.8 );
                scene.addChild( item2 );
                founderItemCount = 1;
        	} else if ( founderItemCount == 1 && Math.floor(global.progress * 100) == 50 ) {
                var item2 = new Founder2();
                item2.onhit = function(){
                    this.parentNode.removeChild(this);
                    global.score += FOUNDER_POINT;
                    ohmaePet.insert( ++global.founder );
                    global.sound.item.play();
                };
                item2.moveTo( SCREEN_WIDTH + 30, PLAYER_POS_Y - PLAYER_JUMP - PLAYER_HEIGHT * 0.8 );
                scene.addChild( item2 );
                founderItemCount = 2;
            } else if ( founderItemCount == 2 && Math.floor(global.progress * 100) == 75 ) {
                var item2 = new Founder3();
                item2.onhit = function(){
                    this.parentNode.removeChild(this);
                    global.score += FOUNDER_POINT;
                    kashimaPet.insert( ++global.founder );
                    global.sound.item.play();
                };
                item2.moveTo( SCREEN_WIDTH + 30, PLAYER_POS_Y - PLAYER_JUMP - PLAYER_HEIGHT * 0.8 );
                scene.addChild( item2 );
                founderItemCount = 3;
            }

        	// 障害物生成•表示
            if ( global.game.frame % 170 == 50 ) {
               var wall = new Wall1();
                wall.moveTo( SCREEN_WIDTH + 30, 390 );
                scene.addChild( wall );
            }
            if ( global.game.frame % 333 == 10 ) {
                var wall = new Wall2();
                wall.moveTo( SCREEN_WIDTH + 30, 390 );
                scene.addChild( wall );
            }
            if ( global.game.frame % 400 == 240 ) {
                var wall = new Wall3();
                wall.moveTo( SCREEN_WIDTH + 30, 390 - PLAYER_JUMP );
                scene.addChild( wall );
            }
            if ( global.game.frame % 400 == 120 ) {
                var wall = new Wall3();
                wall.moveTo( SCREEN_WIDTH + 30, 390 - PLAYER_JUMP / 2 );
                scene.addChild( wall );
            }

            // スコアを増やす
            if (global.game.frame % 2 == 1 ){
                global.score += global.founder + 1;
            }

            // 進捗の更新
            global.progress = global.game.frame / GAME_TIME_LIMIT;

        } else if ( global.player.state == 2 ) {
            // 死んだとき
                global.player.tl.moveBy( 0, -400, 80, enchant.Easing.LINEAR );
                if ( global.player.y < 0 ) {
                    global.sound.bgm.stop();
                    createGameoverScene();
                }
        }else if ( global.player.state == 3 ){
            clearCount++;
            if ( clearCount >= 180 ){   
                global.sound.bgm.stop();
                createGameoverScene();
            }
        }

    };

    return scene;

};


var createScoreText = function ( score ){
    var text = score;
    var temp = 100000;
    for (var i = 0; i < 5; i++ ) {
        if ( score >= temp )
            break;
        text = " " + text;
        temp /= 10;
    }
    text = " " + text;
    return text;
};


/*
 *　ゲームシーン
 */
var createGameScene = function() {

	var scene = new Scene();
	scene.backgroundColor = BACKGROUND_COLLOR;

    // プレイヤーを作成
    global.player = new Player();

    // ファウンダーを作成
    var kashimaPet	 = new KashimaPet();
    var kitazawaPet	 = new KitazawaPet();
    var ohmaePet	 = new OhmaePet();

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
        scene.addChild( new ProgressBack() );
        scene.addChild( new ProgressBox() );
        scene.addChild( new ProgressPanda() );

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
            else
                kashimaPet.insert(1);
            if ( kitazawaPet.exist )
                kitazawaPet.jump();
            else
                kitazawaPet.insert(2);
            if ( ohmaePet.exist )
                ohmaePet.jump();
            else
                ohmaePet.insert(3);
        }
    };

    // フレーム更新時の処理
    scene.onenterframe = function() {

        // ゲームのリミット確認
        if ( global.player.state == 1 && global.game.frame < GAME_TIME_LIMIT ) {

        	// アイテム生成•表示
            if ( global.game.frame % 50 == 0 ) {
                debug.log("item created");
                var item;
                if ( ( randfloat(0, 2) | 0) == 0 ) {
		    item = new Heart();
                } else {
		    item = new Drink();
                } 
                //var item = new Item1();
		var item2;
		
		console.log(global.progress);
		if ( Math.floor(global.progress * 100) == 25 ) {
		    item2 = new Founder1();
		} else if ( Math.floor(global.progress * 100) == 50 ) {
		    item2 = new Founder2();
		} else if ( Math.floor(global.progress * 100) == 75 ) {
		    item2 = new Founder3();
		} else {
		}

		
		if (item2) {
		    item2.moveTo( SCREEN_WIDTH + 30, PLAYER_POS_Y - PLAYER_JUMP + PLAYER_HEIGHT * -1 );
		    scene.addChild( item2 );
		}  else {
		    item.moveTo( SCREEN_WIDTH + 30, PLAYER_POS_Y - PLAYER_JUMP + randInt( 30 , PLAYER_HEIGHT * 2 ));
		    scene.addChild( item );
		    console.log(global.progress, 100);
		}
		console.log('停止', 2);
            }

        	// TODO 障害物生成•表示
            if ( global.game.frame % 170 == 50 ) {
               var wall = new Wall1();
                wall.moveTo( SCREEN_WIDTH + 30, 390 );
                scene.addChild( wall );
            }
            if ( global.game.frame % 290 == 10 ) {
                var wall = new Wall2();
                wall.moveTo( SCREEN_WIDTH + 30, 390 );
                scene.addChild( wall );
            }
            if ( global.game.frame % 100 == 20 ) {
                var wall = new Wall3();
                wall.moveTo( SCREEN_WIDTH + 30, 390 - PLAYER_JUMP );
                scene.addChild( wall );
            }


            // スコアを増やす
            if (global.game.frame % 2 == 1 ){
                global.score += global.founder + 1;
            }

            // 進捗の更新
            global.progress = global.game.frame / GAME_TIME_LIMIT;

        } else if ( global.player.state == 2 ) {
            // ゲーム進行度が100%になったらゲーム終了処理に入る
                global.player.tl.moveBy( 0, -400, 200, enchant.Easing.LINEAR );
                if ( global.player.y == 1 );
                    // TODO ゲームリザルトの表示
        }else if ( global.player.state == 3 ){

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


/*
 *　ゲームシーン
 */
var createGameScene = function() {

	var scene = new Scene();
	scene.backgroundColor = BACKGROUND_COLLOR;

    // スコアラベルを作成
    var scoreLabel = new Label();

	// 背景処理
    scene.bgState = 1;
	var background = new Sprite( BACKGROUND_WIDTH, BACKGROUND_HEIGHT );
    background.image = global.game.assets[ IMAGE_BACKGROUND1 ];
    background.moveTo( 0, 0 );
    background.onenterframe = function() {
    	// スクロール
        this.x -= GAME_SPEED / 2;
        // 端まで行ったら戻す
        if (this.x <= - ( BACKGROUND_WIDTH - SCREEN_WIDTH ) ) {

            switch ( scene.bgState ){
                case 1:
                    if ( scene.progress > 0.3 ) {
                        background.image = global.game.assets[ IMAGE_BACKGROUND2 ];
                        scene.bgState = 2;
                    }
                    break;
                case 2:
                    background.image = global.game.assets[ IMAGE_BACKGROUND3 ];
                    scene.bgState = 3;
                    break;
                case 3:
                    if ( scene.progress >= 0.8 ){
                        background.image = global.game.assets[ IMAGE_BACKGROUND4 ];
                        scene.bgState = 4;
                    }

            }
        	background.moveTo( 0, 0 );
        }
    };
    scene.addChild( background );

	// シーン開始時の処理
	scene.onenter = function() {

		// ゲームフレームを初期化
		global.game.frame = 0;

        // 進捗を初期化
        scene.progress = 0;

		// プレイヤーを表示
        global.player = new Player();
		scene.addChild( global.player );

		// 進捗バー（しましま）を表示
		progBack = new Sprite( 423, 33 );
        progBack.image = global.game.assets[ IMAGE_PROGRESS_BACK ];
        progBack.frame = 0;
        progBack.framecount = 0;
        progBack.moveTo( 510, 570 );
        progBack.onenterframe = function(){
            progBack.framecount = ++this.framecount % 10;
            progBack.frame = Math.floor( progBack.framecount / 2 );
        }
        scene.addChild( progBack );

        // 進捗バー（パンダ）を表示
        progFront  = new Sprite( 70, 53 );
        progFront.image = global.game.assets[ IMAGE_PROGRESS_PANDA ];
        progFront.frame = 0;
        progFront.framecount = 0;
        progFront.moveTo( 510, 570 - 15 );
        progFront.onenterframe = function() {
            this.framecount = ++this.framecount % 10;
            this.frame = Math.floor( this.framecount / 5 );
            progFront.moveTo( 510 + Math.floor( scene.progress * 293 ), 570 - 15 );
        }
        scene.addChild( progFront );

        // 進捗バーを表示
        progBar = new Sprite( 1, 53 );
        progBar.image = global.game.assets[ IMAGE_PROGRESS_BAR ];
        progBar.frame = 0;
        progBar.moveTo( 510, 570 - 15 );
        progBar.onenterframe = function() {
            progBar.image = global.game.assets[ IMAGE_PROGRESS_BAR ];
            progBar.scale( 1, 1 );
            progBar.scale( Math.floor( scene.progress * 293 ) + 1, 1);
        }
//        scene.addChild( progBar );

        // 進捗ふきだしを作成
        progBox = new Sprite( 233, 82 );
        progBox.image = global.game.assets[IMAGE_PROGRESS_BOX ];
        progBox.frame = 0;
        progBox.moveTo( 705, 490 );
        scene.addChild( progBox );

        global.score = 0;
        scoreLabel.font = "48px Tahoma";
        scoreLabel.color = "#054aa7";
        scoreLabel.moveTo(715, 500);
        scoreLabel.text = global.score;
		scene.addChild(scoreLabel);

        dbgLabel = new Label();
        dbgLabel.color = "white";
        dbgLabel.moveTo( 10, 10 );
        dbgLabel.onenterframe = function() {
            dbgLabel.text = Math.floor( scene.progress * 100 ) + " %";
        };
        scene.addChild( dbgLabel );

    };

    // 画面タッチ時の処理
    scene.ontouchstart = function(){
        if(!global.player.isJump()){
        	global.player.jump();
        }
    };

    // フレーム更新時の処理
    scene.onenterframe = function() {

        // ゲームのリミット確認
        if ( global.game.frame < GAME_TIME_LIMIT ) {

        	// TODO アイテム生成•表示
            if ( global.game.frame % 50 == 0 ) {
                console.log("item created");
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
		    console.log('ふぁうんだーif');
		}else if (Math.floor(global.progress * 100) == 50 ) {
		    item2 = new Founder2();
		}else if (Math.floor(global.progress * 100) == 75 ) {
		    item2 = new Founder3();
		} else {
		}
		
		
                item.moveTo( SCREEN_WIDTH + 30, PLAYER_POS_Y - PLAYER_JUMP + randInt( 30 , PLAYER_HEIGHT * 2 ));
                scene.addChild( item );
		console.log('停止', item2);
		if (item2) {
		    item2.moveTo( SCREEN_WIDTH + 30, PLAYER_POS_Y - PLAYER_JUMP + randInt( 30 , PLAYER_HEIGHT * 2 ));
		    scene.addChild( item2 );
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

            // スコアを増やす
            if (global.game.frame % 2 == 1 ){
                global.score++;
            }

            // スコア表示を更新
            scoreLabel.text = createScoreText( global.score );

            // 進捗の更新
            global.progress = global.game.frame / GAME_TIME_LIMIT;
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
        text = "0" + text;
        temp /= 10;
    }
    text = " " + text;
    return text;
};


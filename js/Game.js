(function (D) {
    var State = {
        STAND: 0,
        RUN: 1,
        ATTACK: 2,
        JUMP: 3,
        DAMAGE: 4,
        BULLET: 5,
        FIRE: 6

    }
    
    var ExtraHtml = function (Game) {
        var dictionary = {};

        dictionary.Cell = { W: 100, H: 100 };
        dictionary.Panel = { X: 50, Y: 0, W: Game.property.canvasW - 100, H: 120 };

        dictionary.Cells = [];
        dictionary.Cellsinit = function () {
            this.Cells = [];


        }
        dictionary.Playinit = function () {
            this.setPlayPage();
        }
        dictionary.Editinit = function () {
            this.setEditPage();
            this.setDrag();
            this.SetMovingBtn();
        }
        dictionary.ShowMovingBtnField = function () {
            $('#MovingBtnField').show();
        }
        dictionary.HideMovingBtnField = function () {
            $('#MovingBtnField').hide();
        }
        dictionary.ShowEditTool = function () {
            $('.EditTool').show();
        }
        dictionary.HideEditTool = function () {
            $('.EditTool').hide();
        }
        dictionary.ShowUploadBtn = function () {
            $('#UploadBtn').show();
        }
        dictionary.UploadBtnEnable = function () {
            $('#UploadBtn').removeClass('disabled');
        }
        dictionary.UploadBtnDisabled = function () {
            $('#UploadBtn').addClass('disabled');
        }
        dictionary.ShowPlayBtn = function () {
            $('#PlayBtn').show();
        }
        dictionary.HidePlayBtn = function () {
            $('#PlayBtn').hide();
        }
        dictionary.ShowEditBtn = function () {
            $('#EditBtn').show();
        }
        dictionary.HideEditBtn = function () {
            $('#EditBtn').hide();
        }
        dictionary.ShowHomeBtn = function () {
            $('#HomeBtn').show();
        }
        dictionary.HideHomeBtn = function () {
            $('#HomeBtn').hide();
        }
        dictionary.SliderGroupinit = function () {
            $('#SliderGroup').empty();
        }
        dictionary.EditPanelshow = function () {
            $('#EditPanel').show();
        }
        dictionary.GameUIshow = function () {
            $('#GameUI').show();
        }
        dictionary.GameUIhide = function () {
            $('#GameUI').hide();
        }
        dictionary.MenuFieldshow = function () {
            $('#MenuField').show();
        }
        dictionary.MenuFieldhide = function () {
            $('#MenuField').hide();
        }
        dictionary.QuitBtnshow = function () {
            $('#Quit').show();
        }
        dictionary.Backtogameshow = function () {
            $('#Backtogame').show();
        }
        dictionary.Backtogamehide = function () {
            $('#Backtogame').hide();
        }
        dictionary.StageClearshow = function () {
            $('#StageClear').show();
        }
        dictionary.StageClearhide = function () {
            $('#StageClear').hide();
        }

        dictionary.ObjectEraseshow = function () {
            $('#ObjectErase').show();
        }
        dictionary.ObjectErasehide = function () {
            $('#ObjectErase').hide();
        }

        dictionary.Stageclear = function () {
            this.MenuFieldshow();
            this.Backtogamehide();
            this.StageClearshow();
            
        }
        dictionary.setPlayPage = function () {
            var _self = this;
            _self.GameUIshow();

            if (!Game.StaticEditMode) {
                _self.QuitBtnshow();
            }

            $('#PauseBtn,#Backtogame,#Restartgame,#Quit').unbind('click');
            $('#PauseBtn').click(function () {
                clearInterval(Game.AllInterval);
                _self.MenuFieldshow();
                _self.Backtogameshow();
                _self.StageClearhide();
            });
            $('#Backtogame').click(function () {
                Game.StagePausetoPlay();
                _self.MenuFieldhide();
            });
            $('#Restartgame').click(function () {
                Game.StageRestart();
                _self.MenuFieldhide();
            });
            $('#Quit').click(function () {
                if (Game.StageMode == 'Player') {
                    document.location.href = '/ASPX/StageSelect.aspx';
                }
                else if (Game.StageMode == 'Main') {
                    document.location.href = '/ASPX/MainStage.aspx';
                }
            });
           
        }
        dictionary.setEditPage = function () {
            var _self = this;
            _self.EditPanelshow();
            _self.ShowPlayBtn();
            _self.ShowUploadBtn();
            _self.ShowHomeBtn();
            _self.ShowMovingBtnField();
            _self.GameUIhide();
            _self.MenuFieldhide();

            $('#PlayBtn,#EditBtn,#UploadBtn,#HomeBtn,#SaveYes,#SaveNo').unbind('click');
            $('#PlayBtn').click(function () {
                _self.ShowEditBtn();
                _self.HidePlayBtn();
                _self.HideEditTool();
                _self.HideMovingBtnField();

                _self.DragDisable();

                _self.SliderGroupinit();

                Game.SaveEditCameraPos();
                Game.StageJsonBuild();
                Game.EditMode = false;
                Game.StageRestart();
               
            });
          
            $('#EditBtn').click(function () {
                _self.ShowPlayBtn();
                _self.HideEditBtn();
                _self.ShowEditTool();
                _self.ShowMovingBtnField();

                Game.EditMode = true;
                Game.StageRestart();

            });
            $('#SaveYes').click(function () {
                $("#MovingBtnField").hide();
              
                $('#HomeBG').css({"background-color":"#23264d"})
                $('#Canvases').css({ width: 102, height: 64 });
                $('#MainCanvas').css({ width: 102, height: 64 });
                $('#BgCanvas').css({ width: 102, height: 64 });

                html2canvas($("#Canvases"), {
               
                    onrendered: function (canvas) {

                        var url = canvas.toDataURL("image/png");
                        

                        PageMethods.SaveStage([JSON.stringify(Game.StaticStageJson), url, $('#GameTitle').val(), Game.userId, Game.StageId], OnSuccess);

                        function OnSuccess(response) {

                            document.location.href = '/ASPX/MakeStage.aspx';
                        }
                    }
                });

            });
            $('#SaveNo').click(function () {

                document.location.href = '/ASPX/MakeStage.aspx';

            });
            $('#HomeBtn').click(function () {
                $('#HomeBG').show();
            });
            $('#UploadBtn').click(function () {
                $("#MovingBtnField").hide();

                $('#HomeBG').css({ "background-color": "#23264d" })
                $('#Canvases').css({ width: 102, height: 64 });
                $('#MainCanvas').css({ width: 102, height: 64 });
                $('#BgCanvas').css({ width: 102, height: 64 });

                html2canvas($("#Canvases"), {
                    onrendered: function (canvas) {
                        var url = canvas.toDataURL("image/png");
                      
                        PageMethods.uploadStage([JSON.stringify(Game.StaticStageJson), url, $('#GameTitle').val(), Game.userId, Game.StageId], OnSuccess);

                        function OnSuccess(response) {

                            document.location.href = '/ASPX/MakeStage.aspx';
                        }
                    }
                });
            });
        }
        dictionary.MovingBtnState = null;
        dictionary.SetMovingBtn = function () {
            var _self = this;
            $('#RightBtn,#LeftBtn,#UpBtn,#DownBtn').unbind('mousedown mouseup mouseout');
            $('#RightBtn').mousedown(function () {
                _self.MovingBtnState = 'Right';
            })
            $('#LeftBtn').mousedown(function () {
                _self.MovingBtnState = 'Left';
            })
            $('#UpBtn').mousedown(function () {
                _self.MovingBtnState = 'Up';
            })
            $('#DownBtn').mousedown(function () {
                _self.MovingBtnState = 'Down';
            })


            $('#RightBtn,#LeftBtn,#UpBtn,#DownBtn').mouseup(function () {
                _self.MovingBtnState = null;
            }).mouseout(function () {
                _self.MovingBtnState = null;
            })
            
        }
        dictionary.DragDisable = function () {
            $('.dragPanel img').draggable({
                disabled: true
            });
            $('#Canvases').droppable({
                disabled: true
            });
        }
        dictionary.Sliderinit = function (Appoint,index) {
            
            var Type = Appoint.Type;
            var Object = Appoint.Object;
            var _self = this;

            this.SliderGroupinit();
            if (index != null) {
               
                $('#ObjectErase').unbind('click');
                $('#ObjectErase').click(function () {
                    switch (Type) {
                        case 'enemy':
                        case 'trap':
                            Game.Enemies.splice(index, 1);
                            break;
                        case 'obstacle':
                            Game.Stage.obstacle.splice(index, 1);
                            break;
                    }
                    Game.Mouse.Appoint = null;
                    _self.ObjectErasehide();
                    _self.SliderGroupinit();
                    _self.UploadBtnDisabled();
                });
                this.ObjectEraseshow();
            }
           
            var Data=[];
            switch (Type) {
                case 'player':
                    var Data = [
                       { min: -1, max: 1, step: 2, now: Object.Direction, tag: 'Direction', name: 'Direction' }
                    ]
                    break;
                case 'obstacle':
                    var Data = [
                        { min: 50, max: 500, step: 50, now: Object.W, tag: 'W', name:'Width' },
                        { min: 50, max: 500, step: 50, now: Object.H, tag: 'H', name: 'Height' }
                    ]             
                    break;

                case 'enemy':
                    var Data = [
                        { min: Game.StaticRange.Character.Min, max: Game.StaticRange.Character.Max, step: 1, now: Object.ID, tag: 'ID', name: 'ID' },
                         { min: -1, max: 1, step: 2, now: Object.Direction, tag: 'Direction', name: 'Direction' },
                        { min: 50, max: 5000, step: 50, now: Object.CharacterData.MaxBlood, tag: 'CharacterData.MaxBlood', name: 'Hp' }
                    ]
                    break;
                case 'trap':
                    var Data = [
                        { min: Game.StaticRange.Trap.Min, max: Game.StaticRange.Trap.Max, step: 1, now: Object.ID, tag: 'ID', name: 'ID' },
                         { min: -1, max: 1, step: 2, now: Object.Direction, tag: 'Direction', name: 'Direction' }
                    ]
                    break;
                case 'goal':
                    var Data = [
                        { min: 999, max: 999, step: 1, now: Object.ID, tag: 'ID', name: 'ID' }
                    ]
                    break;
            }
            for (var i = 0; i < Data.length ; i++) {
                $('#SliderGroup').append(
                    "<label >" + Data[i].name + ":</label>" +
                    "<label class='SliderLabel' ></label>"
                );
                $(".SliderLabel").eq(i).html(Data[i].now);
                $("<div class='slider'></div>").appendTo('#SliderGroup').slider({
                    min: Data[i].min,
                    max: Data[i].max,
                    step: Data[i].step,
                    range: "min",
                    value: Data[i].now,
                    slide: function (event, ui) {
                        var index = $('#SliderGroup .ui-slider-handle').index(ui.handle);
                        var Tag = Data[index].tag.split(".");
                  
                        //fk
                        if (Tag.length == 1) {
                            Object[Tag[0]] = ui.value;
                        }
                        else if (Tag.length == 2) {
                            Object[Tag[0]][Tag[1]] = ui.value;
                        }
                        
                        $(".SliderLabel").eq(index).html(ui.value);
                        if (Tag[0] == 'ID') {
                            Game.EnemyIDchange(Object);
                        }

                        _self.UploadBtnDisabled();

                    }

                });
            }

        }
        dictionary.setDrag = function () {
            var _self = this;
            $(".dragPanel img").draggable({
               
                disabled: false,
                containment: "#Container",
                helper: 'clone',
                zIndex: 9999

            });
            $("#Canvases").droppable({

                disabled: false,
                drop: function (event, ui) {

                    var index = $('.ui-draggable').index(ui.draggable);
                    
                    var ContainerPos = $("#Container").offset();
                    var EditPanel = $("#EditPanel");
                    var Pos = ui.helper.offset();

                    var top = Pos.top - ContainerPos.top - EditPanel.height();
                    var left = parseInt(Pos.left - ContainerPos.left);

                    var RealX = parseInt(left + Game.Stage.X);
                    var RealY = parseInt(top - Game.Stage.Y);

                    var PerSize = 25;
                    var ErrX = parseInt(RealX / PerSize);
                    var ErrY = parseInt(RealY / PerSize);

                    var remainderX = RealX % PerSize;
                    var remainderY = RealY % PerSize;
                    if (remainderX > PerSize / 2) {
                        ErrX++;
                    }
                    if (remainderY > PerSize / 2) {
                        ErrY++;
                    }
                    _self.UploadBtnDisabled();

                    switch (index) {
                        case 0:
                            Game.Stage.AddObstacle_Edit(ErrX * PerSize, ErrY * PerSize, 50, 50);
                            break;
                        case 1:
                            var Data = {
                                Character: Game.StaticRange.Character.Min,
                                X: ErrX * PerSize,
                                Y: ErrY * PerSize,
                                Type: "normal",
                                Direction:1,
                                HP:200
                            }

                            Game.AddEnemy(Data);
                            Game.Mouse.SetAppoint(Game.Enemies[Game.Enemies.length - 1], "enemy", Game.Enemies.length - 1);
                            break;
                        case 2:
                            var Data = {
                                Character: Game.StaticRange.Trap.Min,
                                X: ErrX * PerSize,
                                Y: ErrY * PerSize,
                                Type: "normal",
                                Direction: 1,
                                HP: 100
                            }

                            Game.AddEnemy(Data);
                            Game.Mouse.SetAppoint(Game.Enemies[Game.Enemies.length - 1], "trap", Game.Enemies.length - 1);
                            break;
                        default:
                            break;
                    }
                   
                }

            });
        }
        return dictionary;
    }
    var Mouse = function (Game) {
        var dictionary = {};
        dictionary.Pos = null;
        dictionary.RealPos = null;
        dictionary.DragPos = {};
        dictionary.TempPos = {};


        dictionary.ScreenMove = false;
       
        
        dictionary.ScreenMoveWidth = 100;
        dictionary.ScreenMoveHeight = 70;
        dictionary.ScreenV = 10;
        dictionary.PerMove = 25;

        dictionary.Appoint = null;

        dictionary.ObstacleDrag = false;
      
        dictionary.MouseDown = false;

        

        dictionary.SetPos = function (e) {
           
            this.Pos = { x: e.offsetX, y: e.offsetY };
            this.RealPos = { x: e.offsetX + Game.Stage.X, y: e.offsetY - Game.Stage.Y };
        }
        dictionary.ReSetPos = function () {
            if (this.Pos != null) {
                this.RealPos = { x: this.Pos.x + Game.Stage.X, y: this.Pos.y - Game.Stage.Y };
            }
        }


        dictionary.IsPullRight = function () {
            if (this.Pos == null) return false;
            return this.Pos.x >= Game.property.canvasW - this.ScreenMoveWidth && this.Pos.x <= Game.property.canvasW

        }
        dictionary.IsPullLeft = function () {
            if (this.Pos == null) return false;
            return this.Pos.x >= 0 && this.Pos.x <= this.ScreenMoveWidth

        }
        dictionary.IsPullUp = function () {
            if (this.Pos == null) return false;
            return this.Pos.y <= this.ScreenMoveHeight && this.Pos.y >= 0

        }
        dictionary.IsPullDown = function () {
            if (this.Pos == null) return false;
            return this.Pos.y <= Game.property.canvasH && this.Pos.y >= Game.property.canvasH - this.ScreenMoveHeight

        }

        dictionary.SetAppoint = function (Object,Type,index) {
            this.Appoint = {};
            this.Appoint.Type = Type;
            this.Appoint.Object = Object;

            Game.ExtraHtml.Sliderinit(this.Appoint,index);
        }

        dictionary.FindObstacle = function () {
            this.Appoint = null;
            //obstacle
            for (var i = 0; i < Game.Stage.obstacle.length; i++) {
                var Ob = Game.Stage.obstacle[i];
                if (Ob.X <= this.RealPos.x && this.RealPos.x <= Ob.X + Ob.W &&
                    Ob.Y <= this.RealPos.y && this.RealPos.y <= Ob.Y + Ob.H) {
                    this.SetAppoint(Ob, "obstacle",i);
                   
                    return;
                }
            }

            //enemy
            for (var i = 0; i < Game.Enemies.length; i++) {
                var enemy = Game.Enemies[i];
                var enemyLeft = enemy.X;
                var enemyRight = enemy.X + enemy.body.GetWidth();
                var enemyTop = enemy.Y;
                var enemyButton = enemy.Y + enemy.body.GetHeight();
                if (enemyLeft <= this.RealPos.x && this.RealPos.x <= enemyRight &&
                    enemyTop <= this.RealPos.y && this.RealPos.y <= enemyButton) {
                    if (enemy.CharacterData.Type == "Character") {
                        this.SetAppoint(enemy, "enemy", i);
                    }
                    else if (enemy.CharacterData.Type == "Trap") {
                        this.SetAppoint(enemy, "trap", i);
                    }
                    else if (enemy.CharacterData.Type == "Goal") {
                        this.SetAppoint(enemy, "goal", null);
                    }
                  
                    return;
                }
            }

            //player
            var player = Game.Player;
            var playerLeft = player.X;
            var playerRight = player.X + player.body.GetWidth();
            var playerTop = player.Y;
            var playerButton = player.Y + player.body.GetHeight();
            if (playerLeft <= this.RealPos.x && this.RealPos.x <= playerRight &&
                playerTop <= this.RealPos.y && this.RealPos.y <= playerButton) {
               
                this.SetAppoint(player, "player", null);
              
            }
        }
      
       
        dictionary.SetDragPos = function () {
            this.DragPos.X = this.Appoint.Object.X - this.RealPos.x;
            this.DragPos.Y = this.Appoint.Object.Y - this.RealPos.y;
        }

        dictionary.SetObstaclePos = function () {
            this.TempPos.X = this.RealPos.x + this.DragPos.X;
            this.TempPos.Y = this.RealPos.y + this.DragPos.Y;

            var differanceX = parseInt((this.TempPos.X - this.Appoint.Object.X) / this.PerMove);
            var differanceY = parseInt((this.TempPos.Y - this.Appoint.Object.Y) / this.PerMove);

            if (differanceX >= 1||differanceX <= -1) {
                this.Appoint.Object.X += this.PerMove * differanceX;
            }
            if (differanceY >= 1 || differanceY <= -1) {
                this.Appoint.Object.Y += this.PerMove * differanceY;
            }
          
        }
        dictionary.HighlightObstacle = function () {
            if (this.Appoint != null) {
                var x = this.Appoint.Object.X - Game.Stage.X;
                var y = this.Appoint.Object.Y + Game.Stage.Y;

                switch (this.Appoint.Type) {
                    case 'obstacle':
                        Game.mainctx.lineWidth = "5";
                        Game.mainctx.strokeStyle = "#FF0000";
                        Game.mainctx.strokeRect(x, y, this.Appoint.Object.W, this.Appoint.Object.H);
                        break;
                    case 'enemy':
                    case 'trap':
                        Game.mainctx.lineWidth = "5";
                        Game.mainctx.strokeStyle = "#FF0000";
                        Game.mainctx.strokeRect(x, y, this.Appoint.Object.body.GetWidth(), this.Appoint.Object.body.GetHeight());
                        break;
                    case 'goal':
                        Game.mainctx.textAlign = "left";
                        Game.mainctx.fillStyle = "#FF0000";
                        Game.mainctx.font = "bold 25px Calibri";
                        Game.mainctx.fillText("goal", x, y - 10);

                        Game.mainctx.lineWidth = "5";
                        Game.mainctx.strokeStyle = "#FF0000";
                        Game.mainctx.strokeRect(x, y, this.Appoint.Object.body.GetWidth(), this.Appoint.Object.body.GetHeight());
                        break;
                    case 'player':
                        Game.mainctx.textAlign = "left";
                        Game.mainctx.fillStyle = "#FF0000";
                        Game.mainctx.font = "bold 25px Calibri";
                        Game.mainctx.fillText("player", x, y-10);

                        Game.mainctx.lineWidth = "5";
                        Game.mainctx.strokeStyle = "#FF0000";
                        Game.mainctx.strokeRect(x, y, this.Appoint.Object.body.GetWidth(), this.Appoint.Object.body.GetHeight());
                        break;
                }
                
            }
        }
        dictionary.IsDrag=function(){
            return this.Appoint != null  && this.MouseDown;
        }

        return dictionary;
    }
    var AIControl = function (self, Stage) {
        var dictionary = {};

        dictionary.JumpRange = 150;
        dictionary.XRange = 1000;
        dictionary.ErrY = 12;
        dictionary.ErrX = 50;
        dictionary.AttackTick = 0;
        dictionary.AttackTickLoading = function () {

            this.AttackTick--;
            if (this.AttackTick < 0) {
                this.AttackTick = 0;
            }
        }
        dictionary.FindHighGround = function () {
            var selfTop = self.body.GetBodyBotton();
            var selfBotton = self.body.GetBodyBotton() + 5;
            var enemyCenter = self.enemyTarget.body.GetCenterX();

            var RangeErrX = self.body.GetBodyWidth();
            var minRange = 10000000000;

            var NearObstacle = {
                X: -1,
            }
            var NearX = -1;
            for (var i = 0; i < Stage.obstacle.length; i++) {
                if (Stage.obstacle[i].Y >= selfTop &&
                    Stage.obstacle[i].Y <= selfBotton) {
                    var LeftRange = Math.abs(Stage.obstacle[i].X - enemyCenter);
                    var RightRange = Math.abs(Stage.obstacle[i].X + Stage.obstacle[i].W - enemyCenter);
                    var RangeX = Math.min(LeftRange, RightRange);
                    if (RangeX < minRange) {
                        minRange = RangeX;
                        if (LeftRange <= RightRange) {
                            NearObstacle.X = Stage.obstacle[i].X - RangeErrX;
                        }
                        else {
                            NearObstacle.X = Stage.obstacle[i].X + Stage.obstacle[i].W + RangeErrX;
                        }

                    }
                }

            }
            return NearObstacle;
        }

        dictionary.FindLowerGround = function () {
            var selfTop = self.Y - this.JumpRange;
            var selfBotton = self.body.GetBodyBotton()-5;
            var selfLeft = self.body.GetBodyLeft();
            var selfRight = self.body.GetBodyRight();
            var RangeErrX = self.body.GetBodyWidth();
            var minRange = 10000000000;

            var NearObstacle = {
                X: -1,
                Y: -1,
                Center: -1
            }
            var NearX = -1;
            for (var i = 0; i < Stage.obstacle.length; i++) {
                if (Stage.obstacle[i].Y >= selfTop &&
                    Stage.obstacle[i].Y <= selfBotton) {
                    var LeftRange = Math.abs(Stage.obstacle[i].X - selfLeft);
                    var RightRange = Math.abs(Stage.obstacle[i].X + Stage.obstacle[i].W - selfRight);
                    var RangeX = Math.min(LeftRange, RightRange);
                    if (RangeX < minRange) {
                        minRange = RangeX;
                        if (LeftRange <= RightRange) {
                            NearObstacle.X = Stage.obstacle[i].X - RangeErrX;
                        }
                        else {
                            NearObstacle.X = Stage.obstacle[i].X + Stage.obstacle[i].W + RangeErrX;
                        }
                        NearObstacle.Y = Stage.obstacle[i].Y;
                        NearObstacle.Center = Stage.obstacle[i].X + Stage.obstacle[i].W / 2;

                    }
                }

            }
            return NearObstacle;
        }


        dictionary.ControllArrow = function () {
            var selfCenterX = self.body.GetCenterX();
            var enemyCenterX = self.enemyTarget.body.GetCenterX();
            if (enemyCenterX > selfCenterX) {
                self.keyState[39] = true;
                self.keyState[37] = false;
            }
            else if (enemyCenterX < selfCenterX) {
                self.keyState[37] = true;
                self.keyState[39] = false;
            }
        }
        dictionary.Stop = function () {
            self.keyState[37] = false;
            self.keyState[39] = false;
        }
        dictionary.ChaseTheBottomEnemy = function (NearObstacle) {
            var selfLeft = self.body.GetBodyLeft();
            var selfRight = self.body.GetBodyRight();


            var isRight = NearObstacle.X > selfLeft;
            var isLeft = NearObstacle.X < selfRight;
            if (isRight) {
                self.keyState[39] = true;
                self.keyState[37] = false;
            }
            else if (isLeft) {
                self.keyState[37] = true;
                self.keyState[39] = false;
            }
        }
        dictionary.ChaseTheTopEnemy = function (NearObstacle) {
            var selfLeft = self.body.GetBodyLeft();
            var selfRight = self.body.GetBodyRight();
            var selfCenterY = self.body.GetCenterY();
            var selfCenterX = self.body.GetCenterX();

            var isJumpsouldMove = NearObstacle.Y >= selfCenterY;



            var isRight = NearObstacle.X > selfLeft;
            var isLeft = NearObstacle.X < selfRight;
            var isCenter = NearObstacle.X >= selfLeft && NearObstacle.X <= selfRight;
            if (isCenter) {
                if (isJumpsouldMove) {
                    if (selfCenterX < NearObstacle.Center) {
                        self.keyState[39] = true;
                        self.keyState[37] = false;
                    }
                    else if (selfCenterX > NearObstacle.Center) {
                        self.keyState[37] = true;
                        self.keyState[39] = false;
                    }
                }
                self.keyState[88] = true;
            }
            else if (isRight || isLeft) {
                if (isRight) {
                    self.keyState[39] = true;
                    self.keyState[37] = false;
                }
                if (isLeft) {
                    self.keyState[37] = true;
                    self.keyState[39] = false;
                }
            }


        }
        dictionary.Simulate = function () {

            if (self.CharacterData.Type == 'Trap' || self.CharacterData.Type == 'Goal') {
                if (self.InsideDetect(self.enemyTarget) && self.enemyTarget.State == State.DAMAGE) {
                    self.keyState[37] = false;
                    self.keyState[39] = false;
                    self.keyState[90] = false;
                    dictionary.AttackTick = self.AI.AttackTick;
                }
                else if (dictionary.AttackTick==0) {
                    self.keyState[90] = true;
                }
                this.AttackTickLoading();
            }
            else if (self.enemyTarget != null && Math.abs(self.X - self.enemyTarget.X) < 1500) {
                var Distance = Math.random() * (self.AI.ChaseMaxRange - self.AI.ChaseMinRange) + self.AI.ChaseMinRange;
                var DetectXDistance = Math.abs(self.enemyTarget.X - self.X) < Distance;
               
                var EnemyBotton = self.enemyTarget.body.GetBodyBotton();
                var selfBotton = self.body.GetBodyBotton();

                var DetectYDistance = Math.abs(EnemyBotton - selfBotton) < this.ErrY;
                var EnemyAtYourTop = EnemyBotton - selfBotton < -this.ErrY;
                var EnemyAtYourBottom = EnemyBotton - selfBotton > this.ErrY;
               
                if (EnemyAtYourTop) {
                    if (self.enemyTarget.State != State.DAMAGE &&
                        self.enemyTarget.State != State.JUMP &&
                        self.enemyTarget.HitDownWall()) {
                       
                        var NearObstacle = this.FindLowerGround();
                        if (NearObstacle.X != -1) {
                            this.ChaseTheTopEnemy(NearObstacle);

                        }
                    }
                }
                else if (EnemyAtYourBottom && self.State != State.JUMP) {
                    var NearObstacle = this.FindHighGround();
                    if (NearObstacle.X != -1) {
                        this.ChaseTheBottomEnemy(NearObstacle);
                    }
                }
                else if (!DetectXDistance) {
                    this.ControllArrow();
                }
                else {
                    this.Stop();
                }

                if (State.RUN && self.Direction == -1 && self.HitRightWall()||
                    State.RUN && self.Direction == 1 && self.HitLeftWall()) {
                    self.keyState[88] = true;
                }

                if (DetectYDistance) {
                    if (this.AttackTick == 0 && DetectXDistance) {
                        this.ControllArrow();
                        var TickRandom = Math.random() * 10;
                        this.AttackTick = self.AI.AttackTick + TickRandom;
                        self.keyState[90] = true;

                    }
                }
                this.AttackTickLoading();
            }
        }

        return dictionary;
    }
    var Stage = function (Game, JsonData) {


        var dictionary = {};
        dictionary.JsonData = JSON.parse(JSON.stringify(JsonData));

        dictionary.StageHeight = dictionary.JsonData.stage.height;
        dictionary.SkyY = -(dictionary.JsonData.stage.height - Game.property.canvasH);
        dictionary.DeathGround = 700;
        dictionary.horizonY = 1000;
        dictionary.StageWidth = dictionary.JsonData.stage.width;
        dictionary.StageLeft = 0;

        dictionary.Gravity = 9.8;
        dictionary.obstacle = dictionary.JsonData.obstacle;
        dictionary.X = Game.EditCameraPos.X;
        dictionary.Y = Game.EditCameraPos.Y;
        dictionary.MaxUpV = 18;
        dictionary.MinUpV = 1;
        dictionary.MaxDownV = 20;
        dictionary.MinDownV = 8;

        dictionary.ClearStage = function () {
            
            clearInterval(Game.AllInterval);
            //Edit mode
            if (Game.StaticEditMode) {
                Game.ExtraHtml.UploadBtnEnable();
                Game.ExtraHtml.Stageclear();
            }
                //play mode
            else {
                PageMethods.SavePlay([Game.userId, Game.StageId]);
                Game.ExtraHtml.Stageclear();
            }
        }

        dictionary.texture = ['img/bg/bg.jpg', 'img/bg/ground2.png'];
        dictionary.Img = {};

        dictionary.ImgPreRead = function () {
            for (var i = 0; i < this.texture.length; i++) {
                this.Img[i] = new Image();
                this.Img[i].src = this.texture[i];
            }
        }
        dictionary.ImgPreRead();
        
        dictionary.AddObstacle_Edit = function (_X, _Y, _W, _H) {
            var Object = {
                X: _X,
                Y: _Y,
                W: _W,
                H: _H
            }
            this.obstacle.push(Object);
            Game.Mouse.SetAppoint(this.obstacle[this.obstacle.length - 1], "obstacle", this.obstacle.length - 1);

        }
       

        dictionary.DrawBackground = function () {

            var bgimg = this.Img[0];


            var MaxX = this.StageWidth - Game.property.canvasW;
            var x = this.X / MaxX * (bgimg.width - Game.property.canvasW);


            var errY = 200;
            var MaxY = this.StageHeight;
            var lastHeight = (bgimg.height - errY - Game.property.canvasH);
            var y = this.Y / MaxY * lastHeight;
            Game.bgctx.drawImage(bgimg, -x, y - lastHeight);
        }

        dictionary.Drawobstacles = function () {
            var img = this.Img[1];

            for (var i = 0; i < this.obstacle.length; i++) {
                this.DrawObstacleRepeat(img, i);

            }

        }


        dictionary.DrawObstacleRepeat = function (img, index) {
            var obstacle = this.obstacle[index];
            for (var w = 0; w < obstacle.W; w += img.width) {
                for (var h = 0; h < obstacle.H; h += img.height) {
                    var x = obstacle.X - this.X + w;
                    var y = obstacle.Y + this.Y + h;
                    Game.bgctx.drawImage(img, x, y);
                }
            }
        }


        dictionary.GroundDetect = function (Player) {
            var Left_X = Player.body.GetBodyLeft();
            var Right_X = Player.body.GetBodyRight();
            var Player_Top = Player.body.GetBodyTop();

            var maxY = this.horizonY;
            for (var i = 0; i < this.obstacle.length; i++) {
                var obstacle = this.obstacle[i];
                if (obstacle.Y < maxY && Player_Top < obstacle.Y) {
                    if (Left_X > obstacle.X && Left_X < obstacle.X + obstacle.W ||
                        Right_X > obstacle.X && Right_X < obstacle.X + obstacle.W) {
                        maxY = obstacle.Y;
                    }
                }
            }
            return maxY;
        }
        dictionary.TopDetect = function (Player) {
            var Left_X = Player.body.GetBodyLeft();
            var Right_X = Player.body.GetBodyRight();

            var PlayerBotton = Player.body.GetBodyBotton();

            var minY = this.SkyY;
            for (var i = 0; i < this.obstacle.length; i++) {
                var obstacle = this.obstacle[i];
                var obstacle_Bottom = obstacle.Y + obstacle.H;


                if (obstacle_Bottom > minY && PlayerBotton > obstacle.Y) {

                    if (Left_X > obstacle.X && Left_X < obstacle.X + obstacle.W ||
                        Right_X > obstacle.X && Right_X < obstacle.X + obstacle.W) {

                        minY = obstacle_Bottom;
                    }
                }
            }
            return minY;

        }
        dictionary.RightDetect = function (Player) {
            var Top_Y = Player.body.GetBodyTop();
            var Botton_Y = Player.body.GetBodyBotton();
            var Left_X = Player.body.GetBodyLeft();

            var minRight = this.StageWidth;
            for (var i = 0; i < this.obstacle.length; i++) {
                var obstacle = this.obstacle[i];
                var obstacle_Left = obstacle.X;
                var obstacle_Top = obstacle.Y;
                var obstacle_Botton = obstacle.Y + obstacle.H;


                if (obstacle_Left < minRight && Left_X < obstacle_Left) {

                    if (Top_Y > obstacle_Top && Top_Y < obstacle_Botton ||
                        Botton_Y > obstacle_Top && Botton_Y < obstacle_Botton ||
                        obstacle_Top > Top_Y && obstacle_Top < Botton_Y ||
                        obstacle_Botton > Top_Y && obstacle_Botton < Botton_Y) {

                        minRight = obstacle_Left;
                    }
                }
            }
            return minRight;
        }
        dictionary.LeftDetect = function (Player) {
            var Top_Y = Player.body.GetBodyTop();
            var Botton_Y = Player.body.GetBodyBotton();
            var Right_X = Player.body.GetBodyRight();


            var maxLeft = this.StageLeft;
            for (var i = 0; i < this.obstacle.length; i++) {
                var obstacle = this.obstacle[i];
                var obstacle_Right = obstacle.X + obstacle.W;
                var obstacle_Top = obstacle.Y;
                var obstacle_Botton = obstacle.Y + obstacle.H;


                if (obstacle_Right > maxLeft && Right_X > obstacle_Right) {

                    if (Top_Y > obstacle_Top && Top_Y < obstacle_Botton ||
                        Botton_Y > obstacle_Top && Botton_Y < obstacle_Botton ||
                        obstacle_Top > Top_Y && obstacle_Top < Botton_Y ||
                        obstacle_Botton > Top_Y && obstacle_Botton < Botton_Y) {

                        maxLeft = obstacle_Right;
                    }
                }
            }
            return maxLeft;
        }
        return dictionary;
    }
    var Enemy = function (_Stage, Enemyctx, JsonData, JsonEnemyData) {
        var dictionary = Character(_Stage, Enemyctx, JsonData);

        dictionary.JsonEnemyData = JSON.parse(JSON.stringify(JsonEnemyData));
        dictionary.ID = dictionary.JsonEnemyData.Character;
        dictionary.Type = dictionary.JsonEnemyData.Type;
        dictionary.Direction = dictionary.JsonEnemyData.Direction;
        dictionary.X = dictionary.JsonEnemyData.X;
        dictionary.Y = dictionary.JsonEnemyData.Y;

        //set hp
        dictionary.SetHPinit(dictionary.JsonEnemyData.HP);

        dictionary.EnemyAssemble = {};
        dictionary.SetEnemyAssemble = function (EnemyAssemble) {
            this.EnemyAssemble = EnemyAssemble;
        }
        dictionary.AI = dictionary.JsonData.AI;
        dictionary.AIControl = AIControl(dictionary, _Stage);
        dictionary.Controller = function () {
            this.AIControl.Simulate();

        }

        dictionary.DetectDeath = function (index) {

            if (this.CharacterData.Blood == 0) {
                this.EnemyAssemble.splice(index, 1);
            }
        }

        dictionary.initDrawBar = function () {
            var Bar = {
                MaxWidth: 250,
                X: 690,
                Y: 20,
                Height: 20,

                extraWidth: 60,
                extraHeight: 30,
                extraX: null,
                extraY: null,
                text_errX: 55,
                text_errY: 23,
                ColorStart: "#ff004c",
                ColorEnd: "#eb6150",
                Align: 'right'
            }
            Bar.extraX = Bar.X + Bar.MaxWidth - 2;
            Bar.extraY = Bar.Y - (Bar.extraHeight - Bar.Height) / 2;
            this.DrawBar(Bar);
        }

        return dictionary;
    }
    var Bullet = function (Player, Stage, Bulletctx) {
        var dictionary = Character(Stage, Bulletctx, Player.JsonData);

        dictionary.State = State.BULLET;

        dictionary.enemyTarget = Player.enemyTarget;

        dictionary.StartErrX = Player.bulletData.StartErrX;
        dictionary.StartErrY = Player.bulletData.StartErrY;
        dictionary.Direction = Player.Direction;

        dictionary.X = Player.body.GetCenterX() + dictionary.StartErrX * dictionary.Direction - dictionary.Frame[dictionary.State].Width / 2;
        dictionary.Y = Player.body.GetCenterY() + dictionary.StartErrY - dictionary.Frame[dictionary.State].Height / 2;



        dictionary.CharacterData.AccelerateX = Player.bulletData.AccelerateX;
        dictionary.CharacterData.MaxXspeed = Player.bulletData.MaxXspeed;
        dictionary.CharacterData.AccelerateY = Player.bulletData.AccelerateY;
        dictionary.CharacterData.MaxYspeed = Player.bulletData.MaxYspeed;

        dictionary.AccelerateXRise = function () {
            this.Vx += this.CharacterData.AccelerateX;
            if (this.Vx >= this.CharacterData.MaxXspeed) {
                this.Vx = this.CharacterData.MaxXspeed;
            }
            this.Vy += this.CharacterData.AccelerateY;
            if (this.Vy >= this.CharacterData.MaxYspeed) {
                this.Vy = this.CharacterData.MaxYspeed;
            }
        }
        dictionary.Xchange = function () {
            this.X -= this.Vx * this.Direction;
            this.Y += this.Vy;
        }


        dictionary.bulletHitObjectAct = function (index) {
            if (this.State == State.BULLET) {
                if (this.bulletData.IsExport) {
                    this.ChangeToFire("HitObstacle");
                }
                else {
                    this.bulletExport(index);
                }
            }
        }
        dictionary.bulletDetectHit = function (index) {

            var HitEnemy = this.ReturnEnemyBeHit();
            var HasEnemy = HitEnemy.length > 0;
            var HitEnemyBullet = this.IsHitEnemyBullet();
            var HasEnemyBullet = HitEnemyBullet.length > 0;
            var HasBody = this.bulletData.HasBody;

            if (this.HitLeftWall() && HasBody || this.HitRightWall() && HasBody || HasEnemy || HasEnemyBullet) {

               
                if (HasEnemy) {
                   
                    if (this.bulletData.IsExport) {
                        this.Vxinit();
                        this.ChangeToFire("HitEnemy", HitEnemy[0]);
                    }
                }
                else {
                    if (HasEnemyBullet) {
                        for (var i = 0; i < HitEnemyBullet.length; i++) {
                            var HitBullet = HitEnemyBullet[i];
                            if (HitBullet.Bullet.bulletData.HasBody) {
                              
                                HitBullet.Bullet.bulletHitObjectAct(HitBullet.Index);
                            }
                        }
                    }
                    if (HasBody) {
                       
                        this.bulletHitObjectAct(index);
                    }
                }



            }

        }
        dictionary.ChangeToFire = function (type, enemy) {
           
            var Origin_CX = this.body.GetCenterX();
            var Origin_CY = this.body.GetCenterY();

            this.State = State.FIRE;


            var Frame = this.Frame[this.State];
            if (type == 'HitEnemy') {
                this.X = enemy.body.GetCenterX() - Frame.Width / 2;
            }
            else if (type == 'HitObstacle') {
                this.X = Origin_CX - 30 * this.Direction - Frame.Width / 2;
            }
            this.Y = Origin_CY - Frame.Height / 1.5;
            this.Picinit();
        }

        dictionary.FramesNotRepeatprocess = function (index) {


            if (!this.Frame[this.State].IsRepeat &&
                this.PicNum >= this.Frame[this.State].Size) {

                this.bulletExport(index);

            }

        }

        dictionary.bulletExport = function (index) {

            Player.bullet.splice(index, 1);
        }

        return dictionary;
    }
    var Character = function (_Stage, Playerctx, JsonData) {
        var dictionary = {};
        dictionary.JsonData = JSON.parse(JSON.stringify(JsonData));

        dictionary.X = _Stage.JsonData.StartPos.X;
        dictionary.Y = _Stage.JsonData.StartPos.Y;
        dictionary.Direction = _Stage.JsonData.StartPos.Direction;

        dictionary.Frame = dictionary.JsonData.Frame;

        dictionary.img = {};
        dictionary.bullet = [];

        dictionary.CharacterData = dictionary.JsonData.CharacterData;

        dictionary.bulletData = dictionary.JsonData.bulletData;

        dictionary.enemyTarget = {};

        dictionary.SetHPinit = function (HP) {
            this.CharacterData.MaxBlood = HP;

            this.CharacterData.Blood = HP;
        }

        dictionary.SetEnemyTarget = function (EnemyTarget) {
            this.enemyTarget = EnemyTarget;
        }

        dictionary.StateDefine = function () {
            this.OnAirDetect();
            this.keyStateConvert();

        }
        dictionary.Act = function (_property) {


            this.StateAct(_property);

            this.DetectDropDeath();

            this.Draw();
            this.BulletFire();

            this.FramesSwitching();
            this.FramesNotRepeatprocess();

        }
        dictionary.BulletAct = function () {
            if (this.bullet.length > 0) {
                var length = this.bullet.length
                for (var i = length - 1; i >= 0 ; i--) {
                    var bullet = this.bullet[i];

                    switch (bullet.State) {
                        case State.BULLET:
                            bullet.AccelerateXRise();
                            bullet.bulletDetectHit(i);
                            bullet.Xchange();


                            if (!bullet.bulletData.IsExport) {
                                bullet.GiveEnemyDamage();
                            }
                            break;
                        case State.FIRE:
                            bullet.GiveEnemyDamage();
                            break;
                    }


                    bullet.Draw();
                    bullet.FramesSwitching();
                    bullet.FramesNotRepeatprocess(i);
                }
            }
        }
        dictionary.BarShow = false;
        dictionary.GiveEnemyDamage = function () {
            var BeHitEnemies = this.ReturnEnemyBeHit();
            if (BeHitEnemies.length > 0) {
                for (var i = 0; i < BeHitEnemies.length; i++) {
                    if (BeHitEnemies[i].State != State.DAMAGE && this.CharacterData.Type == 'Goal') {
                        _Stage.ClearStage();
                    }
                    else if (BeHitEnemies[i].State != State.DAMAGE && BeHitEnemies[i].CharacterData.HasBody) {
                        BeHitEnemies[i].Picinit();
                        BeHitEnemies[i].Vxinit();
                        BeHitEnemies[i].Vyinit();
                        BeHitEnemies[i].State = State.DAMAGE;
                        BeHitEnemies[i].Vx += this.bulletData.PowerX * this.Direction * BeHitEnemies[i].Direction;
                        BeHitEnemies[i].Vy -= this.bulletData.PowerY;
                        BeHitEnemies[i].T = 0.3;
                        BeHitEnemies[i].BarShow = true;

                        BeHitEnemies[i].CharacterData.Blood -= this.bulletData.Damage;
                        if (BeHitEnemies[i].CharacterData.Blood <= 0) {
                            BeHitEnemies[i].CharacterData.Blood = 0;

                        }
                    }
                }

            }


        }
        dictionary.ReturnEnemyBeHit = function () {

            var enemyArray = [].concat(this.enemyTarget);
            var BeHitEnemies = [];
            for (var i = 0; i < enemyArray.length; i++) {
                if (this.InsideDetect(enemyArray[i])) {
                    BeHitEnemies.push(enemyArray[i]);
                }
            }
            return BeHitEnemies;
        }
        dictionary.IsHitEnemyBullet = function () {

            var enemyArray = [].concat(this.enemyTarget);
            var BeHitBullet = [];
            for (var i = 0; i < enemyArray.length; i++) {
                for (var j = 0; j < enemyArray[i].bullet.length; j++) {
                    if (this.InsideDetect(enemyArray[i].bullet[j])) {
                        var Data = {
                            Bullet: enemyArray[i].bullet[j],
                            Index: j
                        }
                        BeHitBullet.push(Data);
                    }
                }

            }
            return BeHitBullet;
        }
        dictionary.InsideDetect = function (Enemy) {
            var Top_Y = this.body.GetBodyTop();
            var Botton_Y = this.body.GetBodyBotton();
            var Left_X = this.body.GetBodyLeft();
            var Right_X = this.body.GetBodyRight();

            var EnemyTop_Y = Enemy.body.GetBodyTop();
            var EnemyBotton_Y = Enemy.body.GetBodyBotton();
            var EnemyLeft_X = Enemy.body.GetBodyLeft();
            var EnemyRight_X = Enemy.body.GetBodyRight();

            var valueInRange = function (value, min, max) {
                return (value >= min) && (value <= max);
            }

            var xOverlap = valueInRange(Left_X, EnemyLeft_X, EnemyRight_X) ||
                     valueInRange(EnemyLeft_X, Left_X, Right_X);

            var yOverlap = valueInRange(Top_Y, EnemyTop_Y, EnemyBotton_Y) ||
                            valueInRange(EnemyTop_Y, Top_Y, Botton_Y);

            return xOverlap && yOverlap;
        }

        dictionary.keyState = {};

        dictionary.Controller = function () {
            var AttackFire = false;
            var JumpFire = false;
            var _self = this;
            window.addEventListener("keydown", function (e) {

                switch (_self.State) {

                    case State.RUN:
                    case State.STAND:

                        //attack
                        if (!AttackFire && e.keyCode == 90) {

                            AttackFire = true;
                            _self.keyState[e.keyCode] = true;
                        }
                            //jump
                        else if (!JumpFire && e.keyCode == 88) {
                            if (e.keyCode == 37 || e.keyCode == 39) {
                                _self.keyState[e.keyCode] = true;
                            }
                            JumpFire = true;

                            _self.keyState[e.keyCode] = true;
                        }
                        else if (e.keyCode == 37 || e.keyCode == 39) {
                            _self.keyState[e.keyCode] = true;
                        }
                        break;
                    case State.ATTACK:
                        if (e.keyCode == 37 || e.keyCode == 39) {
                            _self.keyState[e.keyCode] = true;
                        }
                        if (!JumpFire && e.keyCode == 88) {
                            JumpFire = true;
                            _self.keyState[e.keyCode] = true;
                        }
                        break;
                    case State.JUMP:
                        if (e.keyCode == 37 || e.keyCode == 39) {
                            _self.keyState[e.keyCode] = true;
                        }
                        if (!AttackFire && e.keyCode == 90) {

                            AttackFire = true;
                            _self.keyState[e.keyCode] = true;
                        }
                        break;

                    case State.DAMAGE:
                        if (e.keyCode == 37 || e.keyCode == 39) {
                            _self.keyState[e.keyCode] = true;
                        }
                        break;

                }


            }, true);
            window.addEventListener("keyup", function (e) {
                switch (_self.State) {
                    case State.STAND:
                    case State.RUN:

                        if (e.keyCode == 88) {
                            _self.keyState[e.keyCode] = false;
                            JumpFire = false;
                        }
                        if (e.keyCode == 90) {
                            AttackFire = false;
                        }
                        if (e.keyCode == 37 || e.keyCode == 39) {

                            _self.State = State.STAND;
                            _self.keyState[e.keyCode] = false;
                        }
                        break;
                    case State.ATTACK:
                    case State.JUMP:
                    case State.DAMAGE:
                        if (e.keyCode == 88) {
                            _self.keyState[e.keyCode] = false;
                            JumpFire = false;
                        }
                        if (e.keyCode == 90) {
                            AttackFire = false;
                        }
                        if (e.keyCode == 37 || e.keyCode == 39) {
                            _self.keyState[e.keyCode] = false;

                        }
                        break;
                }


            }, true);


        }

        dictionary.keyStateConvert = function () {

            switch (this.State) {
                case State.RUN:
                case State.STAND:



                    if (this.keyState[37]) {
                        this.Direction = 1;
                        this.State = State.RUN;

                    }
                    if (this.keyState[39]) {
                        this.Direction = -1;
                        this.State = State.RUN;
                    }
                    if (!this.keyState[39] && !this.keyState[37]) {
                        this.Picinit();
                        this.State = State.STAND;

                    }
                    //attack
                    if (this.keyState[90]) {
                        this.Picinit();
                        this.Vxinit();
                        this.AttackVChange();
                        this.State = State.ATTACK;

                        this.keyState[90] = false;

                    }
                    if (this.keyState[88]) {
                        this.keyState[88] = false;
                        this.JumpPress = true;
                        this.Picinit();
                        this.StartJumpinit();
                        this.T_changeToJumpinit();

                    }

                    break;
                case State.JUMP:
                    if (this.keyState[37]) {
                        this.Direction = 1;

                    }
                    if (this.keyState[39]) {
                        this.Direction = -1;
                    }

                    //attack
                    if (this.keyState[90]) {
                        this.Picinit();
                        this.State = State.ATTACK;
                        this.keyState[90] = false;
                        this.JumpAttackVChange();
                    }
                    break;
                case State.ATTACK:
                    if (this.keyState[88] && this.PicNum >= this.CharacterData.RemoveAttackfreezed
                        && this.HitDownWall()) {
                        this.keyState[88] = false;
                        this.JumpPress = true;

                        this.Picinit();
                        this.StartJumpinit();
                        this.T_changeToJumpinit();

                    }
                    break;



            }

        }

        dictionary.StateAct = function (Property) {
            switch (this.State) {
                case State.RUN:
                    this.AccelerateXRise();
                    this.bodyDetectRUN();

                    break;
                case State.ATTACK:
                case State.DAMAGE:
                    this.bodyDetectRUN();
                    this.GravityCal(Property);
                    this.bodyDetectJUMP();
                    break;
                case State.JUMP:
                    if (this.keyState[37] || this.keyState[39]) {
                        this.VxAbs();
                        this.AccelerateXRise();
                    }
                    else {
                        this.AccelerateXDrop();
                    }

                    this.bodyDetectRUN();
                    this.GravityCal(Property);
                    this.bodyDetectJUMP();

                    break;
                case State.STAND:

                    this.Vxinit();
                    break;


            }

            this.Xchange();
        }

        dictionary.ImgPreRead = function () {
            this.img = {};
            for (var i = 0; i < this.Frame.length; i++) {
                this.img[i] = {};
                this.img[i].frame = {};
                for (var j = 0; j < this.Frame[i].Size; j++) {
                    this.img[i].frame[j * 2] = new Image();
                    this.img[i].frame[j * 2 + 1] = new Image();
                    this.img[i].frame[j * 2].src = 'img/' + this.Frame[i].Base + j + '.png';
                    this.img[i].frame[j * 2 + 1].src = 'img/' + this.Frame[i].Base + j + 'R.png';

                }

            }
        }
        dictionary.ImgPreRead();

        dictionary.body = {


            GetRight: function () {
                var body = dictionary.Frame[dictionary.State].Body;
                return body.Left * 2 + dictionary.X + body.Width;
            },
            GetBodyTop: function () {
                var body = dictionary.Frame[dictionary.State].Body;
                return body.Top + dictionary.Y;
            },
            GetBodyBotton: function () {
                var body = dictionary.Frame[dictionary.State].Body;
                return body.Top + dictionary.Y + body.Height;
            },
            GetBodyLeft: function () {
                var body = dictionary.Frame[dictionary.State].Body;
                return body.Left + dictionary.X;
            },
            GetBodyRight: function () {
                var body = dictionary.Frame[dictionary.State].Body;
                return body.Left + dictionary.X + body.Width;
            },
            GetCenterX: function () {
                var body = dictionary.Frame[dictionary.State].Body;
                return body.Left + dictionary.X + body.Width / 2;
            },
            GetCenterY: function () {
                var body = dictionary.Frame[dictionary.State].Body;
                return body.Top + dictionary.Y + body.Height / 2;
            },
            GetBodyWidth: function () {
                var body = dictionary.Frame[dictionary.State].Body;
                return body.Width;
            } ,
            GetBodyHeight: function () {
                var body = dictionary.Frame[dictionary.State].Body;
                return body.Height;
            },
            GetWidth: function () {
                var data = dictionary.Frame[dictionary.State].Width;
                return data;
            },
            GetHeight: function () {
                var data = dictionary.Frame[dictionary.State].Height;
                return data;
            }
        };







        dictionary.ReturnRealX = function () {
            return this.X - _Stage.X;
        }
        dictionary.ReturnRealY = function () {
            return this.Y + _Stage.Y;
        }

        dictionary.PushScreenDisX = 300;
        dictionary.PushScreenDisY = 100;
        dictionary.PushScreenDisY_Down = 150;

        dictionary.Vy = 0;
        dictionary.Vx = 0;

        dictionary.T = 0;


        dictionary.DownVLimit = 23;



        dictionary.RepeatFramesPic = 0;
        dictionary.PicNum = 0;



        dictionary.State =  State.STAND;


        dictionary.JumpPress = false;
        dictionary.DetectDropDeath = function () {
            if (this.Y >= _Stage.DeathGround) {
                this.CharacterData.Blood = 0;
            }
        }
        dictionary.DetectDeath = function () {

            if (this.CharacterData.Blood == 0) {
                return true;
            }
            return false;
        }

        dictionary.BulletFire = function () {
            if (this.bulletData.hasbullet && this.State == State.ATTACK) {
                for (var i = 0; i < this.bulletData.FirePicframe.length; i++) {
                    if (this.PicNum == this.bulletData.FirePicframe[i] && this.RepeatFramesPic == this.bulletData.FireRepeatframe) {
                        this.bullet.push(Bullet(this, _Stage, Playerctx));

                    }
                }
            }
        }



        dictionary.Vxinit = function () {
            this.Vx = 0;
        }

        dictionary.Vyinit = function () {
            this.Vy = 0;
            this.T = 0;

        }

        dictionary.Xchange = function () {
            this.X -= this.Vx * this.Direction;
        }
        dictionary.AccelerateXRise = function () {
            this.Vx += this.CharacterData.AccelerateX;
            if (this.Vx >= this.CharacterData.MaxXspeed) {
                this.Vx = this.CharacterData.MaxXspeed;
            }
        }
        dictionary.VxAbs = function () {
            this.Vx = Math.abs(this.Vx);
        }
        dictionary.AccelerateXDrop = function () {
            this.Vx -= this.CharacterData.AccelerateX;
            if (this.Vx <= 0) {
                this.Vx = 0;
            }
        }

        dictionary.T_changeToJumpinit = function () {
            this.T = 0.25;
            this.State = State.JUMP;
        }
        dictionary.AttackVChange = function () {
            this.Vy += this.CharacterData.AttackFy;
            this.Vx += this.CharacterData.AttackFx;

            if (this.Vx >= this.CharacterData.MaxXspeed) {
                this.Vx = this.CharacterData.MaxXspeed;
            }

        }
        dictionary.JumpAttackVChange = function () {
            this.Vy += this.CharacterData.JumpAttackFy;
            this.Vx += this.CharacterData.JumpAttackFx;

        }
        dictionary.StartJumpinit = function () {
            this.Vy = this.CharacterData.JumpFy;

        }


        dictionary.GravityCal = function (property) {
            if (this.CharacterData.Gravity) {
                this.T += property.Static_interval / 1000.0;
                this.Vy += _Stage.Gravity * this.T;

                if (this.Vy > this.DownVLimit) {
                    this.Vy = this.DownVLimit;
                }

                this.Y += this.Vy * this.T;
            }

        }


        dictionary.OnAirDetect = function () {

            if (!this.HitDownWall()) {

                switch (this.State) {
                    case State.RUN:
                    case State.STAND:

                        this.Picinit();
                        this.T_changeToJumpinit();

                        break;
                    case State.JUMP:
                        break;
                }
                this.JumpPress = false;


            }

            else if (this.HitDownWall() && !this.HitRightWall(false) &&
                !this.HitLeftWall(false)) {

                if (!this.JumpPress && this.State == State.JUMP) {


                    if (this.Vx > 0) {
                        this.State = State.RUN;

                        this.Vyinit();
                        this.Picinit();
                    }
                    else {

                        this.State = State.STAND;

                        this.Vyinit();
                        this.Vxinit();
                        this.Picinit();
                    }


                }
                else if (!this.JumpPress && this.State == State.ATTACK) {
                    this.Vyinit();
                    this.Vxinit();
                }

            }
        }

        dictionary.FramesSwitching = function () {

            //Switch
            this.RepeatFramesPic++;
            if (this.RepeatFramesPic >= this.Frame[this.State].Data[this.PicNum].RepeatFrames) {
                this.RepeatFramesPic = 0;
                this.PicNum++;
            }


            //Restart
            if (this.Frame[this.State].IsRepeat && this.PicNum >= this.Frame[this.State].Size) {
                this.PicNum = this.Frame[this.State].Restart;
                this.RepeatFramesPic = 0;
            }
        }

        dictionary.FramesNotRepeatprocess = function () {


            if (!this.Frame[this.State].IsRepeat &&
                this.PicNum >= this.Frame[this.State].Size) {

                if (this.State == State.ATTACK) {
                    if (this.T > 0) {
                        this.State = State.JUMP;
                    }
                    else {
                        this.State = State.STAND;
                    }
                }
                else if (this.State == State.DAMAGE) {
                    this.State = State.STAND;
                }

                this.Picinit();

            }

        }

        dictionary.Picinit = function () {
            this.RepeatFramesPic = 0;
            this.PicNum = 0;
        }

        dictionary.ConvertImg = function () {
            var Frameindex = this.PicNum * 2 + ((this.Direction == 1) ? 0 : 1);
            return this.img[this.State].frame[Frameindex];
        }

        dictionary.HitRightWall = function (overlap) {

            var PlayerRight = this.body.GetBodyRight();
            if (overlap != null) {
                return PlayerRight > _Stage.RightDetect(this);
            }
            else {
                return PlayerRight >= _Stage.RightDetect(this);
            }
        }
        dictionary.HitLeftWall = function (overlap) {
            var PlayerLeft = this.body.GetBodyLeft();
            if (overlap != null) {
                return PlayerLeft < _Stage.LeftDetect(this);
            }
            else {
                return PlayerLeft <= _Stage.LeftDetect(this);
            }
        }
        dictionary.HitDownWall = function () {
            var PlayerBotton = this.body.GetBodyBotton();
            return PlayerBotton >= _Stage.GroundDetect(this);
        }
        dictionary.HitTopWall = function () {
            var PlayerTop = this.body.GetBodyTop();
            return PlayerTop <= _Stage.TopDetect(this);
        }

        dictionary.bodyDetectRUN = function () {

            var body = this.Frame[this.State].Body;
            var ErrX = 0.1;
            if (this.HitRightWall()) {

                this.X = _Stage.RightDetect(this) - body.Width - body.Left - ErrX;
                this.Vxinit();
            }
            else if (this.HitLeftWall()) {
                this.X = _Stage.LeftDetect(this) - body.Left + ErrX;
                this.Vxinit();

            }
        }
        dictionary.bodyDetectJUMP = function () {

            var body = this.Frame[this.State].Body;

            if (this.Vy > 0) {
                if (this.HitDownWall()) {
                    this.Y = _Stage.GroundDetect(this) - body.Height - body.Top;
                }
            }
            else if (this.Vy < 0) {
                //hitTop
                if (this.HitTopWall()) {
                    this.Y = _Stage.TopDetect(this) - body.Top;
                    this.Vy = 0;

                }


            }
        }
        dictionary.initDrawBar = function () {
            var Bar = {
                MaxWidth: 250,
                X: 80,
                Y: 20,
                Height: 20,

                extraWidth: 60,
                extraHeight: 30,
                extraX: null,
                extraY: null,
                text_errX: 55,
                text_errY: 23,
                ColorStart: "#ffcc00",
                ColorEnd: "#d36460",
                Align: 'left'
            }
            Bar.extraX = Bar.X - Bar.extraWidth + 2;
            Bar.extraY = Bar.Y - (Bar.extraHeight - Bar.Height) / 2;
            this.DrawBar(Bar);
        }
        dictionary.DrawBar = function (BarData) {



            var ratio = this.CharacterData.Blood / this.CharacterData.MaxBlood;

            var Blood_X = 0;
            if (BarData.Align == 'right') {
                Blood_X = BarData.MaxWidth - ratio * BarData.MaxWidth;
            }


            //barBg
            Playerctx.globalAlpha = 0.5;
            Playerctx.fillStyle = "#332020";
            Playerctx.fillRect(BarData.X, BarData.Y, BarData.MaxWidth, BarData.Height);


            //blood
            Playerctx.globalAlpha = 1;
            var grd = Playerctx.createLinearGradient(BarData.extraX + Blood_X, BarData.Y, ratio * BarData.MaxWidth + BarData.extraWidth, BarData.Height);
            grd.addColorStop(1, BarData.ColorStart);
            grd.addColorStop(0, BarData.ColorEnd);
            Playerctx.fillStyle = grd;
            Playerctx.fillRect(BarData.X + Blood_X, BarData.Y, ratio * BarData.MaxWidth, BarData.Height);

            //border

            Playerctx.beginPath();
            Playerctx.lineWidth = "4";
            Playerctx.strokeStyle = "#332020";
            Playerctx.rect(BarData.X, BarData.Y, BarData.MaxWidth, BarData.Height);
            Playerctx.stroke();

            //Block



            Playerctx.fillStyle = "#332020";
            Playerctx.fillRect(BarData.extraX, BarData.extraY, BarData.extraWidth, BarData.extraHeight);


            //word
            Playerctx.font = "20px Verdana";
            Playerctx.fillStyle = grd;
            Playerctx.textAlign = "right";
            Playerctx.fillText(this.CharacterData.Blood, BarData.extraX + BarData.text_errX, BarData.extraY + BarData.text_errY);

        }

        dictionary.Draw = function () {
            var Frame = this.Frame[this.State];
            var Data = Frame.Data[this.PicNum];

            var errX = (Data.errX != null) ? Data.errX : 0;
            Playerctx.drawImage(this.ConvertImg(), this.ReturnRealX() + Data.X * this.Direction + errX, this.ReturnRealY() + Data.Y, Frame.Width, Frame.Height);

            //draw test
            /*
            Playerctx.fillStyle = "#FFFF00";
            Playerctx.fillRect(-_Stage.X + this.body.GetBodyLeft(), _Stage.Y + this.body.GetBodyTop(), Frame.Body.Width, Frame.Body.Height);
            Playerctx.fillStyle = "#FF0000";
            Playerctx.fillRect(-_Stage.X + this.body.GetCenterX(), _Stage.Y + this.body.GetCenterY(), 2, 2);
            */
        }
        dictionary.clearCanvas = function (property) {
            Playerctx.clearRect(0, 0, property.canvasW, property.canvasH);
        }



        return dictionary;
    }


    D.Game = function (id, Bgid, EditMode, StageMode, userId, StageId, StageJson) {
        this.init(id, Bgid, EditMode, StageMode, userId, StageId, StageJson);

    }

    D.Game.prototype = {
        property: {
            Static_interval: 20,
            canvasW: 0,
            canvasH: 0
        },
        EditMode: false,
        StageMode: null,
        StaticEditMode: false,
        maincanvasID: null,
        BgcanvasID: null,
        mainctx: null,
        bgctx: null,
        enemyctx: null,


        StaticStageJson:{},

        Enemies: [],
        Player: {},
        Stage: {},
        AllInterval: {},
        Mouse: {},
        ExtraHtml: {},

        StaticObjectJson: [],
        StaticRange: {},
     
        StageId: {},
        userId: {},
        EditCameraPos: { X: 0, Y: 0 },

        init: function (id, Bgid, EditMode, StageMode, userId, StageId, StageJson) {
            this.maincanvasID = id;
            this.BgcanvasID = Bgid;
            this.mainctx = document.getElementById(id).getContext("2d");
            this.bgctx = document.getElementById(Bgid).getContext("2d");
            this.EditMode = EditMode;
            this.StageMode = StageMode;
            this.StaticEditMode = EditMode;
            this.StageId = StageId;
            this.userId = userId;
            this.property.canvasW = document.getElementById(id).width;
            this.property.canvasH = document.getElementById(id).height;

            var _self = this;

            
            $.getJSON('character/list.json', function (listdata) {
                _self.StaticObjectJson = [];
              
                _self.StaticRange = {};
                _self.StaticRange.Character = {};
                _self.StaticRange.Character.Min = listdata.character[0];
                _self.StaticRange.Character.Max = listdata.character[listdata.character.length - 1];
                _self.StaticRange.Trap = {};
                _self.StaticRange.Trap.Min = listdata.trap[0];
                _self.StaticRange.Trap.Max = listdata.trap[listdata.trap.length - 1];

               


                var AllObject = listdata.character.concat(listdata.trap).concat(listdata.others);
                var requests = $.map(AllObject, function (value, i) {
                    return $.getJSON("character/" + value + ".json", function (characterdata) {
                        _self.StaticObjectJson[value]=characterdata;
                    });
                });
                $.when.apply($, requests).done(function () {
                    if (StageJson == null) {
                        $.getJSON("stage/template.json", function (Stagedata) {
                            _self.StaticStageJson = JSON.parse(JSON.stringify(Stagedata));
                            _self.StageJsonConstruct(Stagedata);
                        });
                    }
                    else {
                        _self.StaticStageJson = JSON.parse(JSON.stringify(StageJson));
                        _self.StageJsonConstruct(StageJson);
                    }

                });
            });
            


        },
        EnemyIDchange: function (_Enemy) {
            
            var _self = this;
            var _enemyID = _Enemy.ID
            var characterdata = _self.StaticObjectJson[_enemyID];

            _Enemy.Frame = characterdata.Frame;
            _Enemy.ImgPreRead();
               
               
        },
        AddEnemy: function (EnemyData) {
            var _enemyID = EnemyData.Character;
            var characterdata = this.StaticObjectJson[_enemyID];
            this.Enemies.push(Enemy(this.Stage, this.mainctx, characterdata, EnemyData));

        },
        StageJsonConstruct: function (StageJson) {
            var _self = this;

            //stage
            _self.Stage = Stage(_self, StageJson);



            //enemy
            _self.Enemies = [];

            for (var i = 0; i < StageJson.enemy.length; i++) {
                var _enemy = StageJson.enemy[i];
                _self.AddEnemy(_enemy);
            }

            //player
            _self.Player = Character(_self.Stage, _self.mainctx, _self.StaticObjectJson[0]);



            _self.Player.SetEnemyTarget(_self.Enemies);
            for (var i = 0; i < _self.Enemies.length; i++) {
                _self.Enemies[i].SetEnemyTarget(_self.Player);
                _self.Enemies[i].SetEnemyAssemble(_self.Enemies);
            }


            _self.SetPlayerContol();
            _self.StartGame();


        },
        StartGame: function () {
            if (!this.EditMode) {
                this.ExtraHtmlinit();
                this.SetCameraOnPlayer();
                this.AllTimeInterval();
            }
            else {
                this.Mouseinit();
                this.EditMouseEvent();
                this.ExtraHtmlinit_Edit();
                this.AllTimeInterval_Edit();
            }
        },
        StagePausetoPlay: function () {
            if (!this.EditMode) {
                this.AllTimeInterval();
            }
            else {
                this.AllTimeInterval_Edit();
            }
        },
       
        StageRestart: function () {
            clearInterval(this.AllInterval);
            this.StageJsonConstruct(this.StaticStageJson);
        },
       
        StageJsonBuild: function () {
            var dictionary = {};
            dictionary.StartPos = {
                X:  this.Player.X,
                Y: this.Player.Y,
                Direction: this.Player.Direction
            },
            dictionary.enemy = [];
            for (var i = 0; i < this.Enemies.length; i++) {
                var enemy=this.Enemies[i];
                var Object = {
                    Character: enemy.ID,
                    X: enemy.X,
                    Y: enemy.Y,
                    Type: enemy.Type,
                    Direction: enemy.Direction,
                    HP: enemy.CharacterData.MaxBlood
                }
                dictionary.enemy.push(Object);
            }
            dictionary.obstacle = this.Stage.obstacle;
            dictionary.stage={
                width: this.Stage.StageWidth,
                height: this.Stage.StageHeight
            }
            this.StaticStageJson = dictionary;

        },
        AllEdit: function () {
            this.AdjustCameraByMouse();
            this.PlayerAct_EditMode();

            this.EnemiesAct_EditMode();

            this.Drawbackground();

            this.MouseAct();
        },
        AllAct:function(){
            this.PlayerBeforeAct();

            this.EnemiesAct();

            this.PlayerAct();

            this.Drawbackground();
        },
        AllTimeInterval: function () {
            var _self = this;
            this.AllInterval = setInterval(function () {
                _self.AllAct();
            }, this.property.Static_interval);

        },
        AllTimeInterval_Edit: function () {
            var _self = this;
            this.AllInterval = setInterval(function () {
                _self.AllEdit();

            }, this.property.Static_interval);

        },
        SetPlayerContol: function () {
            if (!this.EditMode) {
                this.Player.Controller();
            }
        },
      


        AllCanvasClear: function () {
            this.Player.clearCanvas(this.property);

        },
        
        PlayerBeforeAct: function () {
            this.Player.StateDefine();

            this.AdjustCamera();
            this.AllCanvasClear();
        },
        PlayerAct_EditMode: function () {
            this.AllCanvasClear();
            this.Player.Draw();
        },
       
        PlayerAct: function () {



            this.Player.Act(this.property);
            this.Player.initDrawBar();
            this.Player.BulletAct();
            if (this.Player.DetectDeath()) {
                this.StageRestart();
            }
        },
        EnemiesAct_EditMode: function () {

            for (var i = this.Enemies.length - 1; i >= 0 ; i--) {

                var enemy = this.Enemies[i];
                enemy.Draw();;
            }

        },
        EnemiesAct: function () {

            for (var i = this.Enemies.length - 1; i >= 0 ; i--) {

                var enemy = this.Enemies[i];

                enemy.Controller();

                enemy.StateDefine();
                enemy.Act(this.property);
                enemy.BulletAct();
                enemy.DetectDeath(i);
            }
            this.BarShow();



        },
        BarShow: function () {
            var OnceShow = true;
            var ShowBarindex = -1;
            for (var i = this.Enemies.length - 1; i >= 0 ; i--) {
                var enemy = this.Enemies[i];
                if (enemy.State == State.DAMAGE && OnceShow) {
                    ShowBarindex = i;
                    OnceShow = false;
                    enemy.initDrawBar();
                }
            }
            for (var i = this.Enemies.length - 1; i >= 0 ; i--) {
                if (ShowBarindex == i) {
                    continue;
                }
                var enemy = this.Enemies[i];
                if (enemy.BarShow == true && OnceShow) {
                    OnceShow = false;
                    enemy.initDrawBar();
                }
                else {
                    enemy.BarShow = false;
                }
            }
        },
        SaveEditCameraPos: function () {
            this.EditCameraPos.X = this.Stage.X;
            this.EditCameraPos.Y = this.Stage.Y;
        },
        AdjustCamera: function () {
            //right
            if (this.property.canvasW - (this.Player.body.GetRight() - this.Stage.X)
                <= this.Player.PushScreenDisX) {
                this.Stage.X += Math.abs(this.Player.Vx);
                if (this.Stage.X >= this.Stage.StageWidth - this.property.canvasW) {
                    this.Stage.X = this.Stage.StageWidth - this.property.canvasW;
                }

            }
                //left
            else if ((this.Player.X - this.Stage.X) <= this.Player.PushScreenDisX) {
                this.Stage.X -= Math.abs(this.Player.Vx);
                if (this.Stage.X <= this.Stage.StageLeft) {
                    this.Stage.X = this.Stage.StageLeft;
                }

            }

            //top
            if (this.Player.Y + this.Stage.Y <= this.Player.PushScreenDisY) {

                var V = Math.abs(this.Player.Vy * this.Player.T);
                if (Math.abs(V) > this.Stage.MaxUpV) {
                    V = this.Stage.MaxUpV
                }
                else if (Math.abs(V) < this.Stage.MinUpV) {
                    V = this.Stage.MinUpV;
                }

                this.Stage.Y += V;
                if (this.Stage.Y >= this.Stage.StageHeight) {
                    this.Stage.Y = this.Stage.StageHeight;
                }

            }
                //bottom
            else if (this.property.canvasH - (this.Player.body.GetBodyBotton() + this.Stage.Y) <= this.Player.PushScreenDisY_Down) {
                var V = Math.abs(this.Player.Vy * this.Player.T);
                if (Math.abs(V) > this.Stage.MaxDownV) {
                    V = this.Stage.MaxDownV
                }
                else if (Math.abs(V) < this.Stage.MinDownV) {
                    V = this.Stage.MinDownV;
                }

                this.Stage.Y -= V;
                if (this.Stage.Y <= 0) {
                    this.Stage.Y = 0;
                }

            }

        },
        EditMouseEvent: function () {
            var _self = this;
            var Canvas = document.getElementById(this.maincanvasID);
            Canvas.addEventListener("mousemove", function (e) {
              
                _self.Mouse.SetPos(e);
                if (_self.Mouse.IsPullRight() || _self.Mouse.IsPullUp() ||
                    _self.Mouse.IsPullDown() || _self.Mouse.IsPullLeft()) {


                    _self.Mouse.ScreenMove = true;
                }
                else {
                    _self.Mouse.ScreenMove = false;
                }


                if (_self.Mouse.IsDrag()) {
                   
                    _self.Mouse.ObstacleDrag = true;
                }
                else {
                    _self.Mouse.ObstacleDrag = false;
                }
            });

            Canvas.addEventListener("mouseout", function (e) {
                _self.Mouse.ScreenMove = false;
            });

            Canvas.addEventListener("mousedown", function (e) {
                _self.Mouse.MouseDown = true;
                _self.Mouse.SetPos(e);
                _self.Mouse.FindObstacle();

                if (_self.Mouse.Appoint != null) {
                    _self.Mouse.SetDragPos();
                }
                else {
                    _self.ExtraHtml.SliderGroupinit();
                    _self.ExtraHtml.ObjectErasehide();
                }

            });
            window.addEventListener("mouseup", function (e) {
                _self.Mouse.MouseDown = false;
            })
        },
        Mouseinit: function () {
            this.Mouse = Mouse(this);

        },
        ExtraHtmlinit_Edit: function () {
            this.ExtraHtml = ExtraHtml(this);
            this.ExtraHtml.Editinit();
        },
        ExtraHtmlinit: function () {
            this.ExtraHtml = ExtraHtml(this);
            this.ExtraHtml.Playinit();
        },
        
        MouseAct: function () {
           
              
            this.Mouse.HighlightObstacle();

            if (this.Mouse.ObstacleDrag) {
               
                this.Mouse.SetObstaclePos();
              
            }
            else {
            }
        },
        SetCameraOnPlayer: function () {
            var Y = -this.Player.body.GetCenterY() + this.property.canvasH / 2;
            var X = this.Player.body.GetCenterX() - this.property.canvasW / 2;
            if (X >= this.Stage.StageWidth - this.property.canvasW) {
                X = this.Stage.StageWidth - this.property.canvasW;
            }
            if (X <= this.Stage.StageLeft) {
                X = this.Stage.StageLeft;
            }
            if (Y >= this.Stage.StageHeight) {
                Y = this.Stage.StageHeight;
            }
            if (Y <= 0) {
                Y = 0;
            }
            this.Stage.X = X;
            this.Stage.Y = Y;
        },
        MoveRight: function () {
            this.Stage.X += this.Mouse.ScreenV;
            if (this.Stage.X >= this.Stage.StageWidth - this.property.canvasW) {
                this.Stage.X = this.Stage.StageWidth - this.property.canvasW;
            }
        },
        MoveLeft: function () {
            this.Stage.X -= this.Mouse.ScreenV;
            if (this.Stage.X <= this.Stage.StageLeft) {
                this.Stage.X = this.Stage.StageLeft;
            }
        },
        MoveUp: function () {
            this.Stage.Y += this.Mouse.ScreenV;
            if (this.Stage.Y >= this.Stage.StageHeight) {
                this.Stage.Y = this.Stage.StageHeight;
            }
        },
        MoveDown: function () {
            this.Stage.Y -= this.Mouse.ScreenV;
            if (this.Stage.Y <= 0) {
                this.Stage.Y = 0;
            }
        },
        AdjustCameraByMouse: function () {
            if (this.Mouse.ObstacleDrag || this.ExtraHtml.MovingBtnState) {
                if (this.Mouse.IsPullRight() || this.ExtraHtml.MovingBtnState=='Right') {
                    this.MoveRight();
                }
                if (this.Mouse.IsPullLeft() || this.ExtraHtml.MovingBtnState == 'Left') {
                    this.MoveLeft();
                }
                if (this.Mouse.IsPullUp() || this.ExtraHtml.MovingBtnState == 'Up') {
                    this.MoveUp();
                }
                if (this.Mouse.IsPullDown() || this.ExtraHtml.MovingBtnState == 'Down') {
                    this.MoveDown();
                   
                }
               
                this.Mouse.ReSetPos();
            }
            
        },
        Drawbackground: function () {


            this.Stage.DrawBackground();
            this.Stage.Drawobstacles();




        }
    }


    D.prototype.game = function (id, Bgid, EditMode, StageMode, userId, StageId, StageJson) {
        new D.Game(id, Bgid, EditMode, StageMode,  userId, StageId, StageJson);

    }

})(Document);
$.ajaxSetup({ cache: false });









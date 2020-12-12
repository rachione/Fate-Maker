<%@ Page Language="C#" AutoEventWireup="true" CodeFile="game.aspx.cs" Inherits="index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="js/jquery-1.11.3.min.js"></script>
    <script src="js/jquery-ui.min.js"></script>
    <link href="bootstrap-3.3.6-dist/css/bootstrap.min.css" rel="stylesheet" />
    <script src="bootstrap-3.3.6-dist/js/bootstrap.min.js"></script>
    <script src="js/html2canvas.js"></script>
    <link href="css/index.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">

        <div id="Container" class="Center ">
            

            <div id="Block"></div>
            <div id="HomeBG">
                    <div id="HomePanel" class="col-md-6 col-md-offset-3" >
                        <span id="HomeTitle" class="label">Do you want to save the stage?</span>
                        <div id="Homebtngroup" class="row ">
                            
                                <div id="SaveYes" class="col-md-6 btn btn-success btn-lg ">Yes</div>
                                <div id="SaveNo" class="col-md-6 btn btn-danger btn-lg ">No</div>
                         </div>
                   </div>
            </div>
            <div id="EditPanel" class="panel panel-primary ">

                

                <div class="BtnCollectionMargin PanelCellMargin col-md-4">
                    
                    <div class="col-md-4">
                        <a id="PlayBtn" class="CircleBtn btn btn-danger">
                            <span class="glyphicon glyphicon-play "></span>
                        </a>
                        <a id="EditBtn" class="CircleBtn btn btn-success">
                            <span class="glyphicon glyphicon-pencil "></span>
                        </a>
                    </div>
                    <div class="col-md-4">

                        <a id="UploadBtn" class="CircleBtn btn btn-primary disabled">

                            <span class="glyphicon glyphicon-cloud-upload "></span>

                        </a>

                    </div>
                    <div class="col-md-4">

                        <a id="HomeBtn" class="CircleBtn btn btn-warning ">

                            <span class="glyphicon glyphicon-home"></span>

                        </a>

                    </div>
                    
                </div>

                <div class="EditTool PanelCellMargin  col-md-4">
                    <div class="col-md-12  GameTitlemargin">
                          <div class="form-inline">
                            <label for="exampleInputName2">Game Title:</label>
                            <input id="GameTitle"  type="text" class="form-control" placeholder="Game Title" />
                          </div>
                     </div>
                    <div class="row">
                        <div class=" col-md-4">
                            <div class="dragPanel panel panel-default ">
                                <img src="img/bg/ground2.png" />
                            </div>
                        </div>
                        <div class=" col-md-4">
                            <div class="dragPanel panel panel-default ">
                                <img src="img/tool/enemy.png" />
                            </div>
                        </div>
                        <div class=" col-md-4">
                            <div class="dragPanel panel panel-default ">
                                <img src="img/tool/trap.png" />
                            </div>
                        </div>

                    </div>
                </div>
                <div class="EditTool textMargin col-md-3">
                    <div id="textPanel" class=" panel panel-default ">
                        <div id="SliderGroup" class="col-md-8">
                        </div>
                       
                            <button id="ObjectErase" type="button" class="col-md-4 btn btn-danger">Erase</button>
                        
                    </div>

                </div>
            </div>
           
            <div id="Canvases" class="Center ">
                <div id="GameUI">
                    <div id="MenuField">
                        <div id="Menu" class="col-md-4 col-md-offset-4" >
                            <span id="StageClear" class="label">Stage Clear!</span>
                            <div id="Backtogame" class="btn btn-primary btn-lg btn-block">Back to Game</div>
                            <div id="Restartgame" class="btn btn-primary btn-lg btn-block">Restart Game</div>
                            <div id="Quit" class="btn btn-primary btn-lg btn-block">Quit</div>
                        </div>
                    </div>
                    
                    <a id="PauseBtn" class="btn">
                        <span class="glyphicon glyphicon-pause"></span>
                    </a>
                </div>
            <div id="MovingBtnField">

               


                <a id="UpBtn" class="btn">
                    <span class="glyphicon glyphicon-menu-up"></span>
                </a>
                <a id="LeftBtn" class="btn">
                    <span class="glyphicon glyphicon-menu-left"></span>
                </a>
                <a id="RightBtn" class="btn">
                    <span class="glyphicon glyphicon-menu-right"></span>
                </a>

                <a id="DownBtn" class="btn">
                    <span class="glyphicon glyphicon-menu-down"></span>
                </a>
            </div>
            <canvas id="MainCanvas" width="1024" height="640"></canvas>
            <canvas id="BgCanvas" width="1024" height="640"></canvas>
        </div>
        </div>



        <script src="js/Game.js"></script>

        <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:FateMakerConnectionString %>" SelectCommand="SELECT * FROM [PlayerStage] WHERE ([stage_id] = @stage_id)">
            <SelectParameters>
                <asp:SessionParameter Name="stage_id" SessionField="StageId" Type="Int32" />
            </SelectParameters>
        </asp:SqlDataSource>
        <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePageMethods="true" />


    </form>

</body>
</html>

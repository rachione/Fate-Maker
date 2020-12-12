<%@ Page Language="C#" AutoEventWireup="true" CodeFile="menu.aspx.cs" Inherits="login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <script src="js/jquery-1.11.3.min.js"></script>
    <link href="bootstrap-3.3.6-dist/css/bootstrap.min.css" rel="stylesheet" />
    <script src="bootstrap-3.3.6-dist/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"/>
    <link href="css/login.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <nav class="navbar navbar-inverse fkborder">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="#">Fate/Maker </a>
                </div>
                <div>
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="/ASPX/menu.aspx">Menu</a></li>
                        <li class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown" href="#">Pages<span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="/ASPX/MainStage.aspx">Main Stage</a></li>
                                <li><a href="/ASPX/StageSelect.aspx">Players Stage</a></li>
                                <li><a href="/ASPX/MakeStage.aspx">Your Stage</a></li>
                                <li><a href="/ASPX/LeaderBoard.aspx">Leader Board</a></li>
                            </ul>

                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a id="user" href="#"></a></li>
                        <li><a href="#" runat="server" onserverclick="Logout_Click"><span class="glyphicon glyphicon-log-out"></span>Logout</a></li>
                    </ul>
                </div>
            </div>

        </nav>
        <div class="row">

            <div class="col-md-4 col-md-offset-4">
                <div class="panel panel-primary loginPanel">

                    <div class="panel-body">
                        <h1>Menu</h1>
                        <hr />
                        <img class="img-responsive" src="img/tool/menu.png" />
                        <hr />
                        <div class="row">
                            <div class="col-md-6">
                                <a id="MainStageBtn" href="MainStage.aspx" class="btn btn-primary btn-lg btn-block" ><span class="famargin fa fa-fort-awesome"></span>Main Stage</a>
                            </div>
                            <div class="col-md-6">
                                <a id="PlayerStageBtn" href="StageSelect.aspx" class="btn btn-warning btn-lg btn-block" ><span class="famargin fa fa-users"></span>Players Stage</a>
                            </div>
                        </div>
                        <div class="row fkmargin">
                            <div class="col-md-6">
                                <a id="MakeStageBtn" href="MakeStage.aspx" class="btn btn-danger btn-lg btn-block" ><span class="famargin fa fa-user"></span>Your Stage</a>
                            </div>
                            <div class="col-md-6">
                                <a id="LeaderboardBtn" href="LeaderBoard.aspx" class="btn btn-success btn-lg btn-block" ><span class="famargin fa fa-list-ul"></span>Leader Board</a>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>

        <script>
            function SeteUser(user) {
                $('#user').html("<span class='glyphicon glyphicon-user'></span> " + user);

            }
        </script>
    </form>
</body>

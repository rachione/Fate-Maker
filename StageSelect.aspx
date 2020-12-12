﻿<%@ Page Language="C#" AutoEventWireup="true" CodeFile="StageSelect.aspx.cs" Inherits="login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <script src="js/jquery-1.11.3.min.js"></script>
    <link href="bootstrap-3.3.6-dist/css/bootstrap.min.css" rel="stylesheet" />
    <script src="bootstrap-3.3.6-dist/js/bootstrap.min.js"></script>
    <link href="css/StageSelect.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <nav class="navbar navbar-inverse  navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="/ASPX/menu.aspx">Fate/Maker </a>
                </div>
                <div>
                    <ul class="nav navbar-nav">
                        <li ><a href="/ASPX/menu.aspx">Menu</a></li>
                        <li class="dropdown">
                          <a class="dropdown-toggle" data-toggle="dropdown" href="#">Pages<span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li ><a href="/ASPX/MainStage.aspx">Main Stage</a></li>
                                <li class="active"><a href="/ASPX/StageSelect.aspx">Players Stage</a></li>
                                <li><a href="/ASPX/MakeStage.aspx">Your Stage</a></li>
                                <li><a href="/ASPX/LeaderBoard.aspx">Leader Board</a></li>
                            </ul>
                           
                        </li>
                    </ul>
                     <ul class="nav navbar-nav navbar-right">
                            <li><a id="user" href="#"  ></a></li>
                            <li><a href="#" runat="server" onServerClick="Logout_Click" ><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>
                     </ul>
                </div>
            </div>

        </nav>
        <div class="row  MariginTop">

            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-primary SelectStagePanel">
                    <div  class="panel-body">
                        <h1>Players Stage</h1>
                        <hr />
                        <div id="container">
                            <div class="row">

                                <asp:table id="Table1" runat="server"  class=" StageTable table table-striped  table-hover">
                                </asp:table>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>


        <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:FateMakerConnectionString %>" SelectCommand="SELECT * FROM [PlayerStage] WHERE (([stage_state] = @stage_state) AND ([user_id] &lt;&gt; @user_id)) ORDER BY [upload_time] DESC">
            <SelectParameters>
                <asp:Parameter DefaultValue="uploaded" Name="stage_state" Type="String" />
                  <asp:Parameter DefaultValue="15" Name="user_id" Type="Int32" />
            </SelectParameters>
        </asp:SqlDataSource>

         <script>
             function SeteUser(user) {
                 $('#user').html("<span class='glyphicon glyphicon-user'></span> " + user);

             }
        </script>
    </form>
    
</body>
</html>

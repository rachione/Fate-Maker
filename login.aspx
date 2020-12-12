<%@ Page Language="C#" AutoEventWireup="true" CodeFile="login.aspx.cs" Inherits="login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <script src="js/jquery-1.11.3.min.js"></script>
    <link href="bootstrap-3.3.6-dist/css/bootstrap.min.css" rel="stylesheet" />
    <script src="bootstrap-3.3.6-dist/js/bootstrap.min.js"></script>
    <link href="css/login.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <div class="row">

            <div class="col-md-4 col-md-offset-4">
                <div class="panel panel-primary loginPanel">

                    <div class="panel-body">
                        <h1>Login</h1>
                        <hr />
                        
                        <form class="form-horizontal">
                          
                                <div class="form-group row">
                                  
                                    <div class="col-sm-offset-2 col-sm-8">
                                        <asp:TextBox ID="Account" CssClass="form-control FKasplabel" runat="server" placeholder="Account" ></asp:TextBox>
                                    </div>
                                </div>
                                <div class="form-group  row">
                                    <div class="col-sm-offset-2 col-sm-8">
                                         <asp:TextBox ID="Password" CssClass="form-control FKasplabel" runat="server" placeholder="Password" TextMode="Password" ></asp:TextBox>
                                     </div>
                                </div>

                                
                        </form>
                           
                    </div>
                    <div class="panel-footer">
                        <div class="form-group  row clearfix">
                            <div class=" col-sm-offset-2 col-sm-8" >
                                 <a class="btn btn-link" href="sign.aspx" >Sign up</a>
                                <div class="pull-right ">
                                   
                                    <asp:Button ID="Submit" CssClass="btn btn-primary" runat="server" Text="Log in" OnClick="Submit_Click" />
                                </div>
                              </div>
                        </div>
                     </div>
                </div>

            </div>
        </div>

    </form>
</body>
</html>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using System.Data.SqlClient;
using System.Data;
using System.Web.Configuration;
public partial class login : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["UserId"] == null)
        {
            Response.Redirect("login.aspx");
        }
        else
        {
            ScriptManager.RegisterStartupScript(this, typeof(Page), "UpdateMsg", "SeteUser('" + FindAccount(Convert.ToInt32(Session["UserId"])) + "')", true);
        }

    }
    private string FindAccount(int Userid)
    {
        string Account = null;
        SqlConnection con = new SqlConnection(WebConfigurationManager.ConnectionStrings["FateMakerConnectionString"].ConnectionString.ToString());
        con.Open();
        SqlCommand cmd = new SqlCommand("SELECT * FROM Users WHERE user_id=" + Userid, con);
        SqlDataReader reader = cmd.ExecuteReader(CommandBehavior.SingleRow);
        if (reader.Read())
        {
            Account = reader.GetString(1);

        }
        con.Close();
        return Account;
    }
   
    protected void PlayerStageBtn_Click(object sender, EventArgs e)
    {
        Response.Redirect("StageSelect.aspx");
    }
    protected void MakeStageBtn_Click(object sender, EventArgs e)
    {
        Response.Redirect("MakeStage.aspx");
    }
    
    protected void LeaderboardBtn_Click(object sender, EventArgs e)
    {

    }

    public void Logout_Click(Object sender, EventArgs e)
    {
        Session["UserId"] = null;

        Response.Redirect("login.aspx");
    }
}
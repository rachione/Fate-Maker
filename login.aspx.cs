using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Data;
using System.Web.Configuration;
public partial class login : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void Submit_Click(object sender, EventArgs e)
    {
        SqlConnection con = new SqlConnection(WebConfigurationManager.ConnectionStrings["FateMakerConnectionString"].ConnectionString.ToString());
        con.Open();
        string account = Account.Text;
        string password = Password.Text;
        SqlCommand cmd = new SqlCommand("SELECT * FROM Users WHERE account=@account AND password=@password", con);
        cmd.Parameters.AddWithValue("@account", account);
        cmd.Parameters.AddWithValue("@password", password);
        SqlDataReader reader = cmd.ExecuteReader(CommandBehavior.SingleRow);
        if (reader.Read())
        {
            Session["UserId"] = reader.GetInt32(0);
            Response.Redirect("menu.aspx");

        }
        else
        {
            Account.Text = "";
            Password.Text = "";
        }
        con.Close();
    }
}
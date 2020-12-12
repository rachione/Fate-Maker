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
        if (Password.Text == PasswordConfirm.Text && Account.Text != "" && Password.Text != "" && PasswordConfirm.Text != "")
        {
            SqlConnection con = new SqlConnection(WebConfigurationManager.ConnectionStrings["FateMakerConnectionString"].ConnectionString.ToString());
            con.Open();

            SqlCommand findaccountcmd =
               new SqlCommand("SELECT * FROM Users WHERE account=@account", con);
            findaccountcmd.Parameters.AddWithValue("@account", Account.Text);
            SqlDataReader reader = findaccountcmd.ExecuteReader(CommandBehavior.SingleRow);
            if (reader.Read())
            {
                Account.Text = "";
                Response.Write("<script>alert('帳號重覆');</script>");
            }
            else
            {
                SqlCommand cmd =
                    new SqlCommand("INSERT  INTO Users (account,password)" +
                        " values (@account,@password )", con);

                cmd.Parameters.AddWithValue("@account", Account.Text);
                cmd.Parameters.AddWithValue("@password", Password.Text);
                cmd.ExecuteNonQuery();

                Response.Redirect("login.aspx");
            }
            con.Close();


           
        }
       
    }
}
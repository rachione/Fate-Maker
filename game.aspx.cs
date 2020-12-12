using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.Web.Configuration;
using System.IO;
using System.Reflection;
using System.Globalization;
public partial class index : System.Web.UI.Page
{
    

    protected void Page_Load(object sender, EventArgs e)
    {
       

        if (Session["UserId"] == null)
        {
            Response.Redirect("login.aspx");
        }
        else if(Session["StageId"] == null){

            ScriptManager.RegisterStartupScript(this, typeof(Page), "UpdateMsg", "setTimeout(function(){ document.game('MainCanvas', 'BgCanvas', " + Session["Mode"] + ", '" + Session["Type"] + "'," + Session["UserId"] + ", null ,null)},100)", true);
        }
        else
        {
            DataView dv = (DataView)SqlDataSource1.Select(DataSourceSelectArguments.Empty);
            string StageJson = dv.Table.Rows[0][5].ToString();
            string StageTitle = dv.Table.Rows[0][2].ToString();

            ScriptManager.RegisterStartupScript(this, typeof(Page), "UpdateMsg", "setTimeout(function(){$('#GameTitle').val('" + StageTitle + "'); document.game('MainCanvas', 'BgCanvas', " + Session["Mode"] + ", '" + Session["Type"] + "'," + Session["UserId"] + "," + Session["StageId"] + "," + StageJson + ")},100)", true);
        }
    }
    [System.Web.Services.WebMethod]
    public static bool uploadStage(object[] Json)
    {
        string NowTime = DateTime.Now.ToString("yyyy/MM/dd HH:mm");
        if (Json[4] == null)
        {
            SqlConnection con = new SqlConnection(WebConfigurationManager.ConnectionStrings["FateMakerConnectionString"].ConnectionString.ToString());
            con.Open();
            SqlCommand cmd =
                new SqlCommand("INSERT  INTO PlayerStage (user_id,stage_title,stage_pic,upload_time,stage_json,stage_state)" +
                    " values (@user_id,@stage_title,@stage_pic,@upload_time,@stage_json,@stage_state)", con);
            cmd.Parameters.AddWithValue("@user_id", Json[3].ToString());
            cmd.Parameters.AddWithValue("@stage_title", Json[2].ToString());
            cmd.Parameters.AddWithValue("@stage_pic", Json[1].ToString());
            cmd.Parameters.AddWithValue("@upload_time", NowTime);
            cmd.Parameters.AddWithValue("@stage_json", Json[0].ToString());
            cmd.Parameters.AddWithValue("@stage_state", "uploaded");

            cmd.ExecuteNonQuery();
            con.Close();

           
        }
        else
        {
            SqlConnection con = new SqlConnection(WebConfigurationManager.ConnectionStrings["FateMakerConnectionString"].ConnectionString.ToString());
            con.Open();
            SqlCommand cmd =
                new SqlCommand("UPDATE PlayerStage SET stage_title =@stage_title,upload_time=@upload_time,stage_pic=@stage_pic,stage_json=@stage_json,stage_state=@stage_state " +
                    "WHERE stage_id=@stage_id", con);

            cmd.Parameters.AddWithValue("@stage_title", Json[2].ToString());
            cmd.Parameters.AddWithValue("@stage_pic", Json[1].ToString());
            cmd.Parameters.AddWithValue("@upload_time", NowTime);
            cmd.Parameters.AddWithValue("@stage_json", Json[0].ToString());
            cmd.Parameters.AddWithValue("@stage_state", "uploaded");

            cmd.Parameters.AddWithValue("@stage_id", Json[4].ToString());


            cmd.ExecuteNonQuery();
            con.Close();
        }
        return true;
    }
    [System.Web.Services.WebMethod]
    public static bool SaveStage(object[] Json)
    {
        string NowTime = DateTime.Now.ToString("yyyy/MM/dd HH:mm");
       
        if (Json[4] == null)
        {
            SqlConnection con = new SqlConnection(WebConfigurationManager.ConnectionStrings["FateMakerConnectionString"].ConnectionString.ToString());
            con.Open();
            SqlCommand cmd =
               new SqlCommand("INSERT  INTO PlayerStage (user_id,stage_title,stage_pic,upload_time,stage_json,stage_state)" +
                   " values (@user_id,@stage_title,@stage_pic,@upload_time,@stage_json,@stage_state)", con);
            cmd.Parameters.AddWithValue("@user_id", Json[3].ToString());
            cmd.Parameters.AddWithValue("@stage_title", Json[2].ToString());
            cmd.Parameters.AddWithValue("@stage_pic", Json[1].ToString());
            cmd.Parameters.AddWithValue("@upload_time", NowTime);
            cmd.Parameters.AddWithValue("@stage_json", Json[0].ToString());
            cmd.Parameters.AddWithValue("@stage_state", "-"); ;
            cmd.ExecuteNonQuery();
            con.Close();


        }
        else
        {
            SqlConnection con = new SqlConnection(WebConfigurationManager.ConnectionStrings["FateMakerConnectionString"].ConnectionString.ToString());
            con.Open();
            SqlCommand cmd =
                new SqlCommand("UPDATE PlayerStage SET stage_title =@stage_title,upload_time=@upload_time,stage_pic=@stage_pic,stage_json=@stage_json,stage_state=@stage_state " +
                    "WHERE stage_id=@stage_id", con);

            cmd.Parameters.AddWithValue("@stage_title", Json[2].ToString());
            cmd.Parameters.AddWithValue("@stage_pic", Json[1].ToString());
            cmd.Parameters.AddWithValue("@upload_time", NowTime);
            cmd.Parameters.AddWithValue("@stage_json", Json[0].ToString());
            cmd.Parameters.AddWithValue("@stage_state", "-");

            cmd.Parameters.AddWithValue("@stage_id", Json[4].ToString()); 
            cmd.ExecuteNonQuery();
            con.Close();
        }
        return true;
    }
    [System.Web.Services.WebMethod]
    public static bool SavePlay(object[] Json)
    {
        string NowTime = DateTime.Now.ToString("yyyy/MM/dd HH:mm");
      
            SqlConnection con = new SqlConnection(WebConfigurationManager.ConnectionStrings["FateMakerConnectionString"].ConnectionString.ToString());
            con.Open();
            SqlCommand cmd =
                new SqlCommand("INSERT  INTO Play (user_id,stage_id,clear,clear_time)" +
                    " values (@user_id,@stage_id,@clear,@clear_time )", con);

            cmd.Parameters.AddWithValue("@user_id", Json[0].ToString());
            cmd.Parameters.AddWithValue("@stage_id", Json[1].ToString());
            cmd.Parameters.AddWithValue("@clear", "clear");
            cmd.Parameters.AddWithValue("@clear_time", NowTime);
            
            cmd.ExecuteNonQuery();
            con.Close();


       
        return true;
    }
}
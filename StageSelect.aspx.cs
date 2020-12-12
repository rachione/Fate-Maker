using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.IO;
using System.Data.SqlClient;
using System.Data;
using System.Web.Configuration;
public partial class login : System.Web.UI.Page
{
    private class CellData
    {
        public string Type;
        public string Data;
        public CellData(string Data, string Type)
        {
            this.Type = Type;
            this.Data = Data;
        }
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["UserId"] == null)
        {
            Response.Redirect("login.aspx");
        }
        else
        {
            ScriptManager.RegisterStartupScript(this, typeof(Page), "UpdateMsg", "SeteUser('" + FindAccount(Convert.ToInt32(Session["UserId"])) + "')", true);
            MakeRow<TableHeaderRow, TableHeaderCell>(new CellData[] {
                new CellData("Uploader","Text"),
                new CellData("Preview","Text"),
                new CellData("Title","Text"), 
                new CellData("Upload Time","Text"),
                new CellData("State","Text"), 
                new CellData("","Text") 
            });

            /*
            SqlConnection con = new SqlConnection(WebConfigurationManager.ConnectionStrings["FateMakerConnectionString"].ConnectionString.ToString());
            con.Open();
    
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM [PlayerStage] WHERE [stage_state] = 'uploaded'",con);
                    
            DataTable dt = new DataTable();
            da.Fill(dt);

            DataView dv = new DataView(dt);
            con.Close();
             */
            DataView dv = (DataView)SqlDataSource1.Select(DataSourceSelectArguments.Empty);

            int Length = dv.Table.Rows.Count;

            for (int i = 0; i < Length; i++)
            {
                var Row = dv.Table.Rows[i];
                MakeRow<TableRow, TableCell>(new CellData[] {
                    new CellData(FindAccount((int)Row[1]),"Text"),
                    new CellData(Row[3].ToString(),"StageImg"),
                    new CellData(Row[2].ToString(),"Title"),
                    new CellData(Row[4].ToString(),"Text"),
                    new CellData(isClear((int)Session["UserId"],(int)Row[0]),"Text") 
                }, false, (int)Row[0]);
            }
        }
    }
    private string isClear(int Userid,int Stageid)
    {
        string HasAccount = "-";
        SqlConnection con = new SqlConnection(WebConfigurationManager.ConnectionStrings["FateMakerConnectionString"].ConnectionString.ToString());
        con.Open();
        SqlCommand cmd = new SqlCommand("SELECT play_id FROM Play WHERE user_id=" + Userid + "AND clear='clear'" + " AND stage_id=" + Stageid, con);
        SqlDataReader reader = cmd.ExecuteReader(CommandBehavior.SingleRow);
        if (reader.Read())
        {
            HasAccount = "Clear";

        }
        else
        {
            HasAccount = "-";
        }
        con.Close();
        return HasAccount;
    }
    private string FindAccount(int Userid)
    {
        string Account = null;
        SqlConnection con = new SqlConnection(WebConfigurationManager.ConnectionStrings["FateMakerConnectionString"].ConnectionString.ToString());
        con.Open();
        SqlCommand cmd = new SqlCommand("SELECT account FROM  Users WHERE user_id=" + Userid, con);
        SqlDataReader reader = cmd.ExecuteReader(CommandBehavior.SingleRow);
        if (reader.Read())
        {
            Account = reader.GetString(0);

        }
        con.Close();
        return Account;
    }
    private void MakeRow<Row, Cell>(CellData[] Datas, bool istitle = true, int StageId = 0)
        where Row : TableRow, new()
        where Cell : TableCell, new()
    {
        Row row = new Row();

        for (int i = 0; i < Datas.Length; i++)
        {
            Cell cell = new Cell();
            switch (Datas[i].Type)
            {
                case "Text":
                    cell.Text = Datas[i].Data;
                    row.Cells.Add(cell);
                    break;
                case "Title":
                    cell.CssClass = "CellTitle";
                    cell.Text = Datas[i].Data;
                    row.Cells.Add(cell);
                    break;
                case "StageImg":
                   
                    Image img = new Image();
                    img.ImageUrl = Datas[i].Data;

                    cell.Controls.Add(img);
                    row.Cells.Add(cell);
                    break;
                default:
                    break;
            }
        }
        if (!istitle)
        {
            Cell cellbtn = new Cell();
            cellbtn.CssClass = "cellDisapear";
            Button RowBtn = new Button();
            RowBtn.CssClass = "RowBtn col-md-12";
            RowBtn.CommandArgument = StageId.ToString();
            RowBtn.Command += RowBtn_Click;
            cellbtn.Controls.Add(RowBtn);
            row.Cells.Add(cellbtn);
        }

        Table1.Rows.Add(row);
    }

    void RowBtn_Click(object sender, CommandEventArgs e)
    {
        Session["StageId"] = e.CommandArgument.ToString();
        Session["Type"] = "Player";
        Session["Mode"] = "false";
        Response.Redirect("Game.aspx");

    }
    public void Logout_Click(Object sender, EventArgs e)
    {
        Session["UserId"] = null;

        Response.Redirect("login.aspx");
    }


}
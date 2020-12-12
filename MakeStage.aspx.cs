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
using System.Web.UI.HtmlControls;

public partial class login : System.Web.UI.Page
{

    private class CellData
    {
        public string Type;
        public string Data;
        public CellData( string Data,string Type)
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
                new CellData("#","Text"), 
                new CellData("Preview ","Text"),
                new CellData("Title","Text"),
                new CellData("Storage Time","Text"),
                new CellData("State","Text") ,
                new CellData("Action","Text") 
            });


            DataView dv = (DataView)SqlDataSource1.Select(DataSourceSelectArguments.Empty);

            int Length = dv.Table.Rows.Count;

            for (int i = 0; i < Length; i++)
            {
                var Row = dv.Table.Rows[i];
                MakeRow<TableRow, TableCell>(new CellData[] {
                    new CellData((i+1).ToString(),"Text") , 
                    new CellData(Row[3].ToString(),"StageImg"),
                    new CellData(Row[2].ToString(),"Title"),
                    new CellData(Row[4].ToString(),"Text"),
                    new CellData(Row[6].ToString() ,"Text"),
                    new CellData("-" ,"ButtonGroup")
                }, false, (int)Row[0]);
            }
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
    private void MakeRow<Row, Cell>(CellData[] Datas, bool istitle = true, int StageId = 0)
        where Row : TableRow, new()
        where Cell : TableCell, new()
    {
        Row row = new Row();

        for (int i = 0; i < Datas.Length; i++)
        {
            Cell cell;
            switch (Datas[i].Type)
            {
                case "Text":
                    cell = new Cell();
                    cell.Text = Datas[i].Data;
                    row.Cells.Add(cell);
                    break;
                case "ButtonGroup":
                    HtmlGenericControl BtnGroup = new HtmlGenericControl("div");
                    BtnGroup.Attributes["class"] = "btn-group";

                    Button EditBtn = new Button();
                    EditBtn.CssClass = "btn btn-success";
                    EditBtn.Text = "Edit";
                    EditBtn.CommandArgument = StageId.ToString();
                    EditBtn.Command += RowBtn_Click;

                    Button DeleteBtn = new Button();
                    DeleteBtn.CssClass = "btn btn-danger";
                    DeleteBtn.Text = "Delete";
                    DeleteBtn.CommandArgument = StageId.ToString();
                    DeleteBtn.Command += DeleteBtn_Command;

                    BtnGroup.Controls.Add(EditBtn);
                    BtnGroup.Controls.Add(DeleteBtn);

                    cell = new Cell();
                    cell.Controls.Add(BtnGroup);
                    row.Cells.Add(cell);

                    break;
                case "Title":
                      cell = new Cell();
                      cell.CssClass = "CellTitle";
                      cell.Text = Datas[i].Data;
                      row.Cells.Add(cell);
                    break;
                case "StageImg":
                 
                    Image img = new Image();
                    img.ImageUrl = Datas[i].Data;

                    cell = new Cell();
                    cell.Controls.Add(img);
                    row.Cells.Add(cell);
                    break;
                default:
                    break;
            }

        }
       
        Table1.Rows.Add(row);
    }

    void DeleteBtn_Command(object sender, CommandEventArgs e)
    {
        SqlConnection con = new SqlConnection(WebConfigurationManager.ConnectionStrings["FateMakerConnectionString"].ConnectionString.ToString());
        con.Open();
        SqlCommand cmd = new SqlCommand("DELETE  FROM PlayerStage WHERE stage_id=@stage_id", con);
        cmd.Parameters.AddWithValue("@stage_id", Convert.ToInt32(e.CommandArgument));
        cmd.ExecuteNonQuery();
        con.Close();
        Response.Redirect(Request.RawUrl);
    }

    void RowBtn_Click(object sender, CommandEventArgs e)
    {
        Session["StageId"] = e.CommandArgument.ToString();
        Session["Type"] = "Player";
        Session["Mode"] = "true";
        Response.Redirect("Game.aspx");

    }


    protected void AddStage_Click(object sender, EventArgs e)
    {
        Session["StageId"] = null;
        Session["Type"] = "Player";
        Session["Mode"] = "true";
        Response.Redirect("Game.aspx");
    }
    public void Logout_Click(Object sender, EventArgs e)
    {
        Session["UserId"] = null;

        Response.Redirect("login.aspx");
    }
}
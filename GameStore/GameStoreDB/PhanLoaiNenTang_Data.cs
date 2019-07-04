using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameStoreDB
{
    public static class PhanLoaiNenTang_Data
    {
        public static List<string> LayDanhSachNenTangTheoGame(string MaGame)
        {
            List<string> items = new List<string>();
            DBHelp db = new DBHelp();
            db.SetCommandText("select * from phanloainentang where magame=@magame", System.Data.CommandType.Text);
            db.AddParameter("@magame",MaGame);
            System.Data.DataTable t = new System.Data.DataTable();
            db.FillDataTable(t);
            for(int i=0;i<t.Rows.Count;i++)
            {
                string item = "";
                item = t.Rows[i]["MaNenTang"].ToString();
                items.Add(item);
            }
            return items;
        }
    }
}

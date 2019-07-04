using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameStoreDB
{
    public static class NenTang_Data
    {
         public static string LayTenNenTang(string MaNenTang)
         {
             DBHelp db = new DBHelp();
             db.SetCommandText("select * from nentang where manentang=@manentang", System.Data.CommandType.Text);
             db.AddParameter("@manentang", MaNenTang);
             System.Data.DataTable t = new System.Data.DataTable();
             db.FillDataTable(t);
             return t.Rows[0]["TenNenTang"].ToString();
         }
    }
}

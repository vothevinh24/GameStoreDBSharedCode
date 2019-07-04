using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System;

namespace GameStoreDB
{
    public class DBHelp
    {
        private SqlCommand cmd;
        private bool isOpen;
        private bool intran = false;

        public DBHelp()
        {
            //SqlConnection conn = new SqlConnection(@"workstation id=ngolinh.mssql.somee.com;packet size=4096;user id=ngovanlinh_SQLLogin_1;pwd=u7h72e5cnk;data source=ngolinh.mssql.somee.com;persist security info=False;initial catalog=ngolinh");
            SqlConnection conn = new SqlConnection(@"Server=DESKTOP-V1CGSNS; Database=GameStore; UID=Panda; PWD=16121994");
            this.cmd = conn.CreateCommand();
        }

        public bool InTransaction
        {
            get { return intran; }
            set { intran = value; }
        }

        public void BeginTransaction()
        {
            this.Open();
            SqlTransaction tran = cmd.Connection.BeginTransaction();
            cmd.Transaction = tran;
            InTransaction = true;
        }

        public void Commit()
        {
            if (InTransaction)
                cmd.Transaction.Commit();
            InTransaction = false;
        }
        
        public void RollBack()
        {
            if (InTransaction)
            {
                try
                {
                    cmd.Transaction.Rollback();
                }
                catch
                {
                    this.Close();
                }
                finally
                {
                    InTransaction = false;
                }
            }
        }

        public void Open()
        {
            if (isOpen)
                return;
            if (InTransaction)
                return;
            if (cmd.Connection.State != ConnectionState.Open)
            {
                cmd.Connection.Open();
                isOpen = true;
            }
        }
        public void Close()
        {
            cmd.Connection.Close();
            isOpen = false;
        }
        public void Dispose()
        {
            this.Close();
            cmd.Connection.Dispose();
            cmd.Dispose();
        }

        public void FillDataTable(DataTable tbl)
        {
            //try
            //{
                this.Open();
                SqlDataAdapter adap = new SqlDataAdapter(cmd);
                adap.Fill(tbl);
                this.Dispose();
            //}
            //catch { }
        }
        public int ExcuteNonquery()
        {
            int result = 0;
            try
            {
                this.Open();
                result = cmd.ExecuteNonQuery();
                this.Dispose();
            }
            catch(Exception ex) { }
            return result;
        }
        public object ExcuteScalar()
        {
            object result = null;
            try
            {
                this.Open();
                result = cmd.ExecuteScalar();
            }
            catch (System.Exception ex) { }
            return result;
        }
        public int UpdateDataTable(DataTable tbl)
        {
            int result = 0;
            SqlTransaction tr = null;
            try
            {
                this.Open();
                tr = cmd.Connection.BeginTransaction();
                cmd.Transaction = tr;
                SqlDataAdapter adap = new SqlDataAdapter(cmd);
                SqlCommandBuilder cb = new SqlCommandBuilder(adap);
                result = adap.Update(tbl);
                tr.Commit();
            }
            catch
            {
                if (tr != null) tr.Rollback();
            }
            finally
            {
                cmd.Dispose();
            }
            return result;
        }
        public void AddParameter(string paraName, object paraValue)
        {
            SqlParameter para = cmd.CreateParameter();
            para.ParameterName = paraName;
            para.Value = paraValue;
            cmd.Parameters.Add(para);
        }
        public void SetCommandText(string commandText, CommandType type)
        {
            cmd.CommandText = commandText;
            cmd.CommandType = type;
            cmd.Parameters.Clear();
        }
    }
}

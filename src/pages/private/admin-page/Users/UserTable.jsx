/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import EditableTable from "../../../../components/admin-components/Table/EditableTable";
import accountService from "../../../../services/account-service";
import ConfirmationModal from "../../../../modals/ConfirmationModal";

export default function UserTable({
  data,
  setSelectedData,
  loadingState,
  updateTableFunction,
}) {
  const getRowClassName = (params) => {
    if (params.row.status === "disabled") {
      return "disabledRow";
    }
    return "";
  };

  const [selectedUser, setSelectedUser] = useState();
  const [rowToDelete, setRowToDelete] = useState();
  const [open, setOpen] = useState(false);
  const [promptResponse, setPromptResponse] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [submitKind, setSubmitKind] = useState("");
  const [promptDesc, setPromptDesc] = useState("");

  const [loading, setLoading] = useState(false);

  setSelectedData(selectedUser);

  useEffect(() => {
    if (rowToDelete) {
      setPromptDesc("Are you sure you want to delete this data?");
      setSubmitKind("delete");
      setOpen(true);
    }
  }, [rowToDelete]);

  useEffect(() => {
    if (!open && submit && promptResponse) {
      accountService
        .deleteUser(rowToDelete ? rowToDelete[0]?.uid : "")
        .then(() => {
          setRowToDelete(null);
          setSubmit(false);
          updateTableFunction();
        })
        .catch((err) => {
          alert(err?.message);
          setRowToDelete(null);
          setSubmit(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [submit, promptResponse]);

  const columns = [
    // { field: "uid", headerName: "ID", width: 70 },
    {
      field: "status",
      headerName: "Status",
      width: 200,
    },
    {
      field: "username",
      headerName: "User",
      width: 200,
    },
    {
      field: "role",
      headerName: "Role",
      width: 200,
    },
    {
      field: "officeName",
      headerName: "Office",
      width: 500,
    },
    {
      field: "schoolName",
      headerName: "School",
      width: 500,
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 300,
    },
    {
      field: "middleName",
      headerName: "Middle Name",
      width: 300,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 300,
    },
    {
      field: "age",
      headerName: "Age",
      width: 100,
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        "& .MuiDataGrid-columnHeaders": {
          color: "black !important",
          backgroundColor: "#FE9496 !important",
          borderBottom: "none",
        },
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: "#fff",
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: "lightgray",
        },
        "& .MuiCheckbox-root": {
          color: "black !important",
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: "black !important",
        },
        "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
          {
            display: "none",
          },
        scrollbarWidth: "thin",
        msOverflowStyle: "none",
        "&::-webkit-scrollbar": {
          width: "0.5rem",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#53FDFD",
        },
        marginTop: "5px",
        "& .disabledRow": {
          backgroundColor: "#fc3d69",
        },
      }}
    >
      <ConfirmationModal
        open={open}
        handleClose={() => setOpen(false)}
        setPromptResponse={setPromptResponse}
        setSubmit={setSubmit}
        submitKind={submitKind}
        promptDesc={promptDesc}
      />
      <EditableTable
        data={data}
        columns={columns}
        checkbox
        loading={loadingState || loading}
        singleSelect
        selectedData={setSelectedUser}
        rowToDelete={setRowToDelete}
        height="80vh"
        getRowClassName={getRowClassName}
      />
    </Box>
  );
}

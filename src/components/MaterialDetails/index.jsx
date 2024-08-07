/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useMemo } from "react";
import dayjs from "dayjs";
import { useNavigate, useLocation } from "react-router-dom";
import debounce from "lodash/debounce";
import { FcDocument } from "react-icons/fc";
import { AiFillDatabase } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import DataNotFound from "../../pages/miscelleaneous/NoData";

export default function Materials() {
  const location = useLocation();
  const navigate = useNavigate();
  const { gradeLevel, learningArea, resourceType, allMaterials } =
    location.state || {};

  const materials = allMaterials || [];
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

  // Debounce the search input to improve performance
  const debouncedSearch = useMemo(
    () => debounce((query) => setSearch(query), 300),
    []
  );

  useEffect(() => {
    // Cleanup function for debouncing
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  useEffect(() => {
    const searchTerm = search.trim().toLowerCase();

    if (searchTerm) {
      setResult(
        materials.filter((material) =>
          material.title.toLowerCase().includes(searchTerm)
        )
      );
    } else {
      setResult(materials);
    }
  }, [search, materials]);

  return (
    <Box sx={{ overflow: "auto" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: 1.5,
          backgroundColor: "#383838",
        }}
      >
        <AiFillDatabase style={{ fontSize: 21, color: "white" }} />
        <Box sx={{ display: "flex", gap: { lg: 68, xl: 120 } }}>
          <Typography
            variant="h6"
            sx={{
              paddingLeft: 1,
              display: "flex",
              alignItems: "center",
              color: "white",
            }}
          >
            Materials
          </Typography>
          <TextField
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CiSearch style={{ fontSize: 21 }} />
                </InputAdornment>
              ),
            }}
            onChange={(evt) => setSearch(evt.target.value)}
            value={search}
            size="small"
            sx={{
              padding: 1,
              "& .MuiOutlinedInput-root": {
                bgcolor: "white",
                "& fieldset": {
                  borderColor: "#555",
                },
                "&:hover fieldset": {
                  borderColor: "#777",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#999",
                },
              },
              color: "white",
            }}
          />
        </Box>
      </Box>

      {result.length === 0 ? (
        <DataNotFound />
      ) : (
        <List>
          {result.map((material) => {
            const formattedDate = dayjs(material.uploaded_at).format(
              "YYYY-MM-DD hh:mm A"
            );

            return (
              <ListItem
                key={material.id}
                sx={{ borderBottom: "solid 1px black" }}
              >
                <FcDocument style={{ fontSize: 40, paddingRight: 10 }} />
                <ListItemText>
                  <Typography
                    sx={{
                      fontFamily: "Fira Sans Condensed",
                      fontWeight: "bold",
                      fontSize: 21,
                    }}
                  >
                    {material.title}
                  </Typography>
                  <Typography sx={{ fontFamily: "Fira Sans Condensed" }}>
                    {material.topicContent}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Fira Sans Condensed",
                      color: "#014963",
                      display: "flex",
                      gap: 3,
                    }}
                  >
                    <Typography>{`Grade ${material.gradeLevel}`}</Typography>
                    <Typography sx={{ fontFamily: "Fira Sans Condensed" }}>
                      {material.learningArea}
                    </Typography>
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Fira Sans Condensed",
                      fontWeight: "bold",
                      color: "black",
                      display: "flex",
                      gap: 3,
                      fontSize: 11,
                    }}
                  >
                    {`Published at ${formattedDate}`}
                  </Typography>
                </ListItemText>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    pr: 5,
                  }}
                >
                  <Button sx={{ backgroundColor: "#83dcfc" }}>
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "black",
                        fontFamily: "Fira Sans Condensed",
                        fontWeight: "bold",
                      }}
                    >
                      VIEW DETAILS
                    </Typography>
                  </Button>
                  <Button sx={{ backgroundColor: "#8cfab0" }}>
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "black",
                        fontFamily: "Fira Sans Condensed",
                        fontWeight: "bold",
                      }}
                    >
                      DOWNLOAD
                    </Typography>
                  </Button>
                </Box>
              </ListItem>
            );
          })}
        </List>
      )}
    </Box>
  );
}

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell,{tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import * as React from "react";
import { useState, useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { styled } from '@mui/material/styles';
import BasicModal from "../../components/Modal.jsx";

import Head from "next/head";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor:theme.palette.common.white ,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  // '&:last-child td, &:last-child th': {
  //   border: 0,
  // },
}));

const headCells = [
  {
    id: "Unit ID",

    alignCell: true,
    label: "Unit ID",
  },
  {
    id: "Unit type",

    alignCell: false,
    label: "Unit type",
  },
  {
    id: "Price",

    alignCell: false,
    label: "Price",
  },
  {
    id: "Build up area",

    alignCell: false,
    label: "Build up area",
  },
  {
    id: "For sale",

    alignCell: false,
    label: "For sale",
  },
  {
    id: "Gallery",

    alignCell: false,
    label: "Gallery",
  },
];
const mystyle = {
  position: "absolute",
  top: "50%",
  center: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Dashboard({ unitsArray }) {
  const [units, setUnits] = useState(unitsArray);
  const [sortOption, setSortOption] = useState("bua");
  const [search, setSearch] = useState("");
  const [page, setPage] = React.useState(1);
  const [unitsPerPage, setUnitsPerPage] = React.useState(5);

  /************************************************************* */
  const handelOnchangeSearch = (e) => {
    setSearch(e.target.value);
  };

  /*******************************************************************/
  const handleOnchangeSorting = (event) => {
    setSortOption(event.target.value);
  };
  /***************************************************** */
  const handelSortByOption = () => {
  
    let sortedArray = [...units];
    if (sortOption == "total_price") {
      sortedArray = sortedArray.sort(function (a, b) {
        return a.total_price - b.total_price;
      });
    }
    
    else if(sortOption=="bua"){
      sortedArray = sortedArray.sort(function (a, b) {
        return a.bua - b.bua;
      });
    }
    else if (sortOption == "unit_type") {
      sortedArray = sortedArray.sort(function (a, b) {
        if (a.unit_type < b.unit_type) {
          return -1;
        }
        if (a.unit_type > b.unit_type) {
          return 1;
        }
        return 0;
      });
    } 

    setUnits(sortedArray);
  };
  /******************************** */
  const handleChangePage = (event, newPage) => {

    setPage(newPage);
  };

  const handelSearchById = () => {
   console.log("page",page)
    let newUnits = [...unitsArray];
    console.log(" before search newUnits",newUnits)
    newUnits = newUnits.filter((unit) => {
      if (search.toLowerCase() === "") {
        return unit;
      } else {
        return unit.unit_id.toLowerCase().includes(search);
      }
    });
    console.log(" after search newUnits",newUnits, newUnits.length)
    setPage(1)
    setUnits(newUnits);
  };
  useEffect(() => {
    handelSearchById();
  }, [search]);
  /************************************************** */
  useEffect(() => {
    handelSortByOption();
  }, [sortOption]);
  /************ trasnform price to text format ex:1500000=>1.5M ******************* */
  const transformNumber = (value) => {
    if (value === null) return null;
    if (value === 0) return "0";
    var fractionSize = 1;
    var abs = Math.abs(value);
    var rounder = Math.pow(10, fractionSize);
    var isNegative = value < 0;
    var key = "";
    var powers = [
      { key: "B", value: Math.pow(10, 9) },
      { key: "M", value: Math.pow(10, 6) },
      { key: "k", value: 1000 },
    ];
    for (var i = 0; i < powers.length; i++) {
      var reduced = abs / powers[i].value;
      reduced = Math.round(reduced * rounder) / rounder;
      if (reduced >= 1) {
        abs = reduced;
        key = powers[i].key;
        break;
      }
    }
    return (isNegative ? "-" : "") + abs + " " + key;
  };
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    // page > 0 ?
    Math.max(0, (1 + (page-1)) * unitsPerPage - units.length);
  //  : 0;

  return (
    <>
      <Head>
        <title>data</title>
        <meta name="description" content="building data" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container maxWidth="lg" sx={{ mb: 2 }}>
        <Box sx={{ pt: 2 }}>
          <Typography
            sx={{
              fontFamily: "DM Sans",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "24px",
              lineHeight: "31px",

              color: "#000000",
            }}
          >
            Dashbord
          </Typography>
          <Paper
            sx={{
              width: "100%",
              mb: 1,
              boxShadow: "none",
              marginTop: "10px",
              marginRight: "10px",
            }}
          >
            <Breadcrumb />
          </Paper>
          <Paper
            sx={{
              width: "100%",
              mb: 2,
              boxShadow: "none",
              backgroundColor: "#F5F5F5",
            }}
          >
            <Toolbar
              sx={{
                pl: { sm: 1 },
                pr: { xs: 1, sm: 1 },

                display: { md: "flex", xs: "block" },
              }}
            >
              <Box sx={{ display: "flex", flex: "1" }}>
                <Typography variant="h6" id="tableTitle" component="h6">
                  Filter by Id:
                </Typography>
                <Paper
                  component="form"
                  sx={{
                    marginLeft: "4px",
                    paddingLeft: "8px",
                    boxShadow: "none",
                    borderRadius: "0",
                  }}
                >
                  <InputBase
                    placeholder="ex: 45785"
                    inputProps={{ "aria-label": "search" }}
                    onChange={handelOnchangeSearch}
                    value={search}
                    variant="outlined"
                    sx={{ width: "165px" }}
                  />
                </Paper>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton>
                  <FilterListIcon />
                </IconButton>

                <Typography component="h6" mr={1}>
                  sorted by:
                </Typography>
                <FormControl variant="standard">
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={sortOption}
                    onChange={handleOnchangeSorting}
                    disableUnderline
                  >
                    <MenuItem value="bua">Unit area</MenuItem>
                    <MenuItem value="unit_type">Unit Type</MenuItem>
                    <MenuItem value="total_price">Unit Price</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Toolbar>
            <TableContainer
              sx={{
                // pl: { sm: 2, xs: 1 },
                // pr: { xs: 1, sm: 1 },
                borderRadius: "4px",
                backgroundColor: "#FFFFFF",
              
              }}
            >
              
              <Table
                 sx={{ minWidth: 750 }}
              >
                <TableHead>
                  <TableRow>
                    {headCells.map((headCell) => (
                      <StyledTableCell
                        key={headCell.id}
                        align={headCell.alignCell ? "left" : "center"}
                        sx={{
                          paddingTop: "16px",
                          paddingBottom: "16px",
                          paddingLeft:`${headCell.alignCell ? "10px" : "0"}`,
                          paddingRight: "0px",
                        }}
                      >
                        {headCell.label}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {units.length ? (
                    units
                      .slice(
                        (page-1) * unitsPerPage,
                        (page-1) * unitsPerPage + unitsPerPage
                      )
                      .map((unit, index) => {
                        

                        return (
                          <StyledTableRow hover tabIndex={-1} key={unit.unit_id} >
                            <TableCell
                              component="th"
                            
                              scope="row"
                            
                              align="left"
                            >
                              {unit.unit_id}
                            </TableCell>
                            <TableCell align="center" padding="none">
                              {unit.unit_type}
                            </TableCell>
                            <TableCell align="center" padding="none">
                              {transformNumber(unit.total_price)}
                              <Typography sx={{ pl: 1 }} component="span">
                                EGP
                              </Typography>
                            </TableCell>
                            <TableCell align="center" padding="none">
                              {unit.bua}
                              <Typography sx={{ pl: 1 }} component="span">
                                m²
                              </Typography>
                            </TableCell>
                            <TableCell align="center" padding="none">
                              {unit.for_sale ? (
                                <Button
                                  variant="contained"
                                  sx={{ backgroundColor: "primary" }}
                                >
                                  For Sale
                                </Button>
                              ) : (
                                <Button
                                  variant="contained"
                                  sx={{
                                    color: "#ffffff",
                                    backgroundColor: "#616161",
                                  }}
                                  padding="none"
                                >
                                  Not For Sale
                                </Button>
                              )}
                            </TableCell>
                            <TableCell align="center" padding="none">
                              <BasicModal
                                srcImg={unit.photos?.slice(0, 1)}
                                images={unit.photos}
                              />
                            </TableCell>
                          </StyledTableRow>
                        );
                      })
                  ) : (
                    <TableRow hover tabIndex={-1}>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        align="left"
                        colSpan={6}
                      >
                        <Typography>
                          No Unit Founded ,please try another id
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 53 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Stack spacing={2} alignItems="center">
            <Pagination
              count={Math.round(units.length / unitsPerPage )}
              page={page}
              color="primary"
              onChange={handleChangePage}
            />
          </Stack>
        </Box>
      </Container>
    </>
  );
}

export const getStaticProps = async () => {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch("https://unitsdashpord-default-rtdb.firebaseio.com/listings.json");
  const data = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: { unitsArray: data },
  };
};
//export default Dashbord;

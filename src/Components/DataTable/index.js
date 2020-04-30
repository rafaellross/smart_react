import React, {Component} from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { lighten, makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Toolbar from '@material-ui/core/Toolbar';

import Switch from '@material-ui/core/Switch';
import * as API from '../../Api'
import * as Helpers from '../../Helpers'


import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';



const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }));

  const classes = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }));
  


function EnhancedTableHead(props) {
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox              
              checked={props.allSelected}
              onChange={(e) => props.onCheckBoxAll(e.target.checked)}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell>
          {props.columns.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={props.sortDirection}
            >
              <TableSortLabel
                active={props.orderByField === headCell.id}
                direction={props.sortDirection}
                onClick={(e) => props.sortBy(headCell.id)}
              >
                {headCell.label}
                {props.orderByField === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected, title } = props;
  
    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            {title}
          </Typography>
        )}
  
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  };


class DataTable extends Component {

    state = {
        selecteds: [],
        allSelected: false,
        sortBy: 'id',
        sortDirection: 'desc',
        loading: true,
        rowsPerPage: 30,
        page: 0,
        
    }
        

    handleChangePage = (e) => {
        console.log(e)
        this.setState((prevState, props) => ({
            page: prevState.page++
        }));            
        
    }


    
    handleChangeRowsPerPage = (rowPerPage) => {        
        this.setState((prevState, props) => ({
            rowsPerPage: rowPerPage
        }));            


    }

    onCheckBox = (id, checked) => {
        if (checked) {
            this.setState((prevState, props) => ({
                selecteds: prevState.selecteds.concat(id)
            }));            
                
        } else {
            this.setState((prevState, props) => ({
                selecteds: prevState.selecteds.filter(item => item !== id)
            }));            

        }
                          
    }

    onCheckBoxAll = (checked) => {
        console.log(checked);
        if (!this.state.allSelected) {
            this.setState((prevState, props) => ({
                selecteds: prevState.data.map(row => row.id),
                allSelected: true
          }));
        } else {
            this.setState({
                selecteds: [],
                allSelected: false
          });

        }
              
    }    

    onSortBy = (column) => {

      this.setState((prevState, props) => ({
        sortBy: column,
        sortDirection: prevState.sortDirection === 'asc' ? 'desc' : 'asc',
        data: Helpers.stableSort(prevState.data, Helpers.getComparator(prevState.sortDirection === 'asc' ? 'desc' : 'asc', column))
    
    }));            


        //console.log('Click sort by', column, 'New direction is: ', this.state.sortDirection);
    }


    loadData = (table) => {
        API.getAll(table)
        .then((data) => {            
            this.setState(() => ({
                data: data,
                loading: false
          }))                    
        })    
    }

    componentDidMount = () => {
        
        this.loadData(this.props.table);
    }



    render() {
                 
          const { columns, title } = this.props;          
          const data = this.state.data;
          
          
          return (
        <div>

        <Paper className={classes.paper}>
          <EnhancedTableToolbar numSelected={this.state.selecteds} title={title}/>
          <TableContainer component={Paper}>
            <Table size={'small'}>
            <EnhancedTableHead              
              
              orderByField={this.state.sortBy}
              sortDirection={this.state.sortDirection}
              onCheckBoxAll={this.onCheckBoxAll}
              sortBy={this.onSortBy}
              
              columns={columns}
              allSelected={this.state.allSelected}
              classes={classes}
            />

              <TableBody>
                 {!this.state.loading && (
                    data.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                    .map((row) => (
        
                        <TableRow hover key={row.id}>
                        <TableCell padding="checkbox">
                            <Checkbox
                                checked={this.state.selecteds.includes(row.id) }
                                onChange={(e) => this.onCheckBox(row.id, e.target.checked)}
                            />
                        </TableCell>                      
                            {columns.map((column) => (        
                                    <TableCell key={row[column.id]}>{row[column.id]}</TableCell>                          
                            ))}                
                        </TableRow>
                    ))
  
                 )
                }
              </TableBody>
            </Table>
          </TableContainer>
        <TablePagination
        rowsPerPageOptions={[30, 60, 120]}
        component="div"
        count={!this.state.loading && (this.state.data.length)}
        rowsPerPage={this.state.rowsPerPage}
        page={this.state.page}
        onChangePage={this.handleChangePage}
        onChangeRowsPerPage={this.handleChangeRowsPerPage}
      />
    </Paper>
    </div>
        );
    }
}

export default DataTable



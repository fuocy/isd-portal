import React, { useEffect,Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Plugin } from '@devexpress/dx-react-core';
import { PagingState, CustomPaging } from '@devexpress/dx-react-grid';
import { PagingPanel } from '@devexpress/dx-react-grid-material-ui';
import { PAGE_SIZE_LIST } from 'utils/config';
type DevPagingProps = {
    totalCount?: number;
    // onPageSizeChange:(newType: number) => void;
    // pageSize?:number;
    // currentPage?:number;
    // onCurrentPageChange:(newType: number) => void;

   
  };
// const PagingContainer = (props: DevPagingProps) => {
//     // const classes = useStyles();
//     return (
//       <PagingPanel.Container
//         {...props}
//         // className={`${classes.customPaging} customPager`}
//       />
//     );
//   };
export const DevPaging = (props: DevPagingProps) => {
    // const onCurrentPageChange = (currentPage:any) => {
    //     // console.log(currentPage)
    //     if (props.onCurrentPageChange) {
    //       props.onCurrentPageChange(currentPage);
    //     }
    //   };
    return (
        <Fragment>
            <CustomPaging totalCount={props.totalCount} />
            {/* <PagingState
                currentPage={props.currentPage}
                onCurrentPageChange={onCurrentPageChange}
                pageSize={props.pageSize}
                onPageSizeChange={props.onPageSizeChange}
            />
          
            <PagingPanel
                pageSizes={PAGE_SIZE_LIST}
                containerComponent={PagingContainer}
                messages={{ rowsPerPage: 'Rows per page' }}
            /> */}
        </Fragment>
    )

}
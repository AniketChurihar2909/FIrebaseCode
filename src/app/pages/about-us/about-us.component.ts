import { ContactUsComponent } from './../contact-us/contact-us.component';
import { NotificationService } from './../../services/notification.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  displayedColumns: string[] = ['company','firstName','lastName','address','address2','state','city','actions'];
  listData: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  constructor(public notificationService : NotificationService,
    private dialog: MatDialog,private authservice: AuthService,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.authservice.getContacts().subscribe(
      list => {
        let array = list.map(item => {
       //   let departmentName = this.departmentService.getDepartmentName(item.payload.val()['department']);
          return {
            $key: item.key,
         //   departmentName,
            ...item.payload.val()
          };
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        // this.listData.filterPredicate = (data, filter) => {
        //   return this.displayedColumns.some(ele => {
        //     return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
        //   });
        // };
      });
    }

    onSearchClear() {
      this.searchKey = "";
      this.applyFilter();
    }

    applyFilter() {
      this.listData.filter = this.searchKey.trim().toLowerCase();
    }

    onCreate() {
      this.authservice.initializeFormGroup();
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      this.dialog.open(ContactUsComponent,dialogConfig);
    }

    onEdit(row){
      this.authservice.populateForm(row);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      this.dialog.open(ContactUsComponent,dialogConfig);
    }

    onDelete($key){
      // if(confirm('Are you sure to delete this record ?')){
      // this.authservice.deleteContact($key);
      // this.notificationService.warn('! Deleted successfully');
      // }

      this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
      .afterClosed().subscribe(res =>{
        if(res){
          this.authservice.deleteContact($key);
          this.notificationService.warn('! Deleted successfully');
        }
      });
    }

}

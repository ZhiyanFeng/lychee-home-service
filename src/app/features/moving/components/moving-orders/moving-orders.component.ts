import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortHeader, MatSortModule} from '@angular/material/sort';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {Store} from "@ngrx/store";
import {MovingOrderActions} from "../../../../core/store/moving-order/moving-order.actions";
import {MovingOrder} from "../../models/moving-order";
import {selectAllOrders} from "../../../../core/store/moving-order/moving-order.selectors";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-moving-orders',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatInput,
    MatLabel,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatTable,
    MatHeaderCellDef,
    DatePipe
  ],
  templateUrl: './moving-orders.component.html',
  styleUrl: './moving-orders.component.css'
})

export class MovingOrdersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'from', 'to', 'movingDate','type', 'status', 'createdAT'];
  dataSource: MatTableDataSource<MovingOrder>;
  movingOrders: MovingOrder[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;
  constructor(private store: Store) {
    this.store.dispatch(MovingOrderActions.loadMovingOrders());
    // Assign the data to the data source for the table to render
  }

  ngOnInit(): void {
    this.store.select(selectAllOrders).subscribe((entities) => {
      this.movingOrders = entities;
      this.dataSource = new MatTableDataSource(this.movingOrders);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

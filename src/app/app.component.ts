import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, OnInit,
  ViewChild, ViewEncapsulation
} from '@angular/core';
import {FlatfileCustomer, FlatfileMethods} from "@flatfile/angular";
import {FlatfileResults} from "@flatfile/adapter";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { EChartsOption } from 'echarts';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
export interface PeriodicElement {
  Hauptartikelnr: string;
  Artikelname: string;
  Hersteller: string;
  Beschreibung: string;
  Materialangaben: string;
  Geschlecht: string;
  Produktart: string;
  Armel: string;
  Bein: string;
  Kragen: string;
  Herstellung: string;
  Taschenart: string;
  Grammatur: string;
  Material: string;
  Ursprungsland: string;
  Bildname: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements FlatfileMethods, OnInit {
  title = 'CSV';
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild('input') input: ElementRef | any
  modalReferenceAddrecord: any;
  recordsForm: FormGroup = this.createForm({
    Armel: '',
    Artikelname: '',
    Bein: '',
    Beschreibung: '',
    Bildname: '',
    Geschlecht: 'Herren',
    Grammatur: '',
    Hauptartikelnr: '',
    Hersteller: '',
    Herstellung: '',
    Kragen: '',
    Material: '',
    Materialangaben: '',
    Produktart: '',
    Taschenart: '',
    Ursprungsland: ''
  });
  displayedColumns: string[] = [
    'Hauptartikelnr',
    'Artikelname',
    'Hersteller',
    'Beschreibung',
    'Materialangaben',
    'Geschlecht',
    'Produktart',
    'Armel',
    'Bein',
    'Kragen',
    'Herstellung',
    'Taschenart',
    'Grammatur',
    'Material',
    'Ursprungsland',
    'Bildname'];
  data : PeriodicElement[] = [];
  // data = ELEMENT_DATA;
  dataSource: MatTableDataSource<any> ;
  customer : FlatfileCustomer =
    { userId: "12345" };
  licenseKey = "2a8ca5c3-a3f6-4587-93f4-a8bdf18eead4";
  settings = {
    type: "test import",
    fields: [
      { label: "Hauptartikelnr", key: "Hauptartikelnr" },
      { label: "Artikelname", key: "Artikelname" },
      { label: "Hersteller", key: "Hersteller" },
      { label: "Beschreibung", key: "Beschreibung" },
      { label: "Materialangaben", key: "Materialangaben" },
      { label: "Geschlecht", key: "Geschlecht" },
      { label: "Produktart", key: "Produktart" },
      { label: "Armel", key: "Armel" },
      { label: "Bein", key: "Bein" },
      { label: "Kragen", key: "Kragen" },
      { label: "Herstellung", key: "Herstellung" },
      { label: "Taschenart", key: "Taschenart" },
      { label: "Grammatur", key: "Grammatur" },
      { label: "Material", key: "Material" },
      { label: "Ursprungsland", key: "Ursprungsland" },
      { label: "Bildname", key: "Bildname" }
    ],
    managed: true
  }
  optionsBar : EChartsOption = {};
  optionsPie : EChartsOption = {};

  constructor(private cdRef: ChangeDetectorRef, private modalService: NgbModal, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.cdRef.detectChanges();
  }

  charts() : void {
    let damenLength =  this.dataSource.data.filter((o) => {
      return o.Geschlecht.toLowerCase() == 'damen'
    }).length;
    let herrenLengtch =   this.dataSource.data.filter((o) => {
      return o.Geschlecht.toLowerCase() == 'herren'
    }).length
    let kinderLengtch =   this.dataSource.data.filter((o) => {
      return o.Geschlecht.toLowerCase() == 'kinder'
    }).length
    let nakedshirt =  this.dataSource.data.filter((o) => {
      return o.Hersteller.toLowerCase() == 'nakedshirt'
    }).length;
    let jassz =  this.dataSource.data.filter((o) => {
      return o.Hersteller.toLowerCase() == 'jassz'
    }).length;
    let anvil =  this.dataSource.data.filter((o) => {
      return o.Hersteller.toLowerCase() == 'anvil'
    }).length;
    let americanApparel =  this.dataSource.data.filter((o) => {
      return o.Hersteller.toLowerCase() == 'american Apparel'
    }).length;
    let allSport =  this.dataSource.data.filter((o) => {
      return o.Hersteller.toLowerCase() == 'all Sport'
    }).length;
    let atlantis =  this.dataSource.data.filter((o) => {
      return o.Hersteller.toLowerCase() == 'atlantis'
    }).length;
    let aR =  this.dataSource.data.filter((o) => {
      return o.Hersteller.toLowerCase() == 'a&r'
    }).length;
    this.optionsBar =    {
      title: {
        text: 'Products per gender',
        textAlign: 'left',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: ['Herren', 'Damen', 'Kinder'],
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
            },
          },
          axisLabel: {
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
            },
          },
          splitLine: {
            lineStyle: {
            },
          },
          axisLabel: {
          },
        },
      ],
      series: [
        {
          name: 'Produkte',
          type: 'bar',
          barWidth: '20%',
          data: [herrenLengtch,damenLength,kinderLengtch ],
        },
      ],
    };
    this.optionsPie = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['Nakedshirt', 'Jassz', 'Anvil', 'American Apparel', 'All Sport','Atlantis','A&R'],
        textStyle: {
        },
      },
      series: [
        {
          name: 'Produkte',
          type: 'pie',
          radius: '80%',
          center: ['50%', '50%'],
          data: [
            { value: nakedshirt, name: 'Nakedshirt' },
            { value: jassz, name: 'Jassz' },
            { value: anvil, name: 'Anvil' },
            { value: americanApparel, name: 'American Apparel' },
            { value: allSport, name: 'All Sport' },
            { value: atlantis, name: 'Atlantis' },
            { value: aR, name: 'A&R' },
          ],
        },
      ],
    };
  }
  private createForm(model: PeriodicElement): FormGroup {
    return this.fb.group(model);
  }

  onData(results: FlatfileResults): Promise<string> {
    let errorState = false;
    this.dataSource.data.push(...results.data);
    this.dataSource.paginator = this.paginator;
    this.charts();
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (errorState) {
          reject('rejected - this text is controlled by the end-user');
          errorState = false;
        } else {
          resolve('Flatfile upload successful - this text is controlled by the end-user');
        }
      }, 3000);
    });
  }

  openModalAddRecord(content: any) {
    this.modalReferenceAddrecord = this.modalService.open(content, {
      size: 'md',
      modalDialogClass: 'modal-dialog-centered',
      centered: true,
      backdrop: 'static',
      animation: true,
    });
    this.modalReferenceAddrecord.result.then(() => {});
  }

  addRecord(){
    this.dataSource.data.unshift(this.recordsForm.value);
    this.dataSource.paginator = this.paginator;
    this.charts();
  }
}

import Component from '@ember/component';
import styles from './grid-demo-styles';

export default class GridDemoComponent extends Component {
  didInsertElement() {
    import('ag-grid-community/main').then(grid => {
      this.initializeGrid(grid);
    });
  }

  styles = styles;

  initializeGrid(grid) {
    if (this.isDestroying) {
      return;
    }

    let linkTag = document.createElement('link');
    linkTag.href = "/ag-grid.css";
    linkTag.rel = "stylesheet";
    document.head.appendChild(linkTag);

    const gridOptions = {
      columnDefs: [
        {headerName: 'Make', field: 'make'},
        {headerName: 'Model', field: 'model'},
        {headerName: 'Price', field: 'price'}
      ],
      rowData: [
        {make: 'Toyota', model: 'Celica', price: 35000},
        {make: 'Ford', model: 'Mondeo', price: 32000},
        {make: 'Porsche', model: 'Boxter', price: 72000}
      ]
    };
    this.gridInstance = new grid.Grid(this.element.querySelector('.grid-container'), gridOptions);
  }

  willDestroyElement() {
    if (this.gridInstance) {
      this.gridInstance.destroy();
    }
  }
}

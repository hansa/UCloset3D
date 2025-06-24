import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragEnd, DragDropModule } from '@angular/cdk/drag-drop';
import * as Blockly from 'blockly';
import { DEFAULT_OUTFITS } from '../../models/default-outfits';
import { ClosetItem } from '../../models/closet-item';

@Component({
  selector: 'app-drag-stylist',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './drag-stylist.component.html',
  styleUrl: './drag-stylist.component.scss'
})
export class DragStylistComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('blockly', { static: true }) blocklyRef!: ElementRef<HTMLDivElement>;

  ctx!: CanvasRenderingContext2D;
  items: ClosetItem[] = [];

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.items = DEFAULT_OUTFITS.map((o, idx) => ({ ...o, x: 10, y: idx * 90 }));
    this.initBlockly();
    // draw base avatar placeholder
    this.ctx.fillStyle = '#f5f5f5';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  onDragEnd(event: CdkDragEnd, piece: ClosetItem) {
    const pos = event.source.getFreeDragPosition();
    this.placeItem(piece.url!, pos.x, pos.y);
  }

  placeItem(url: string, x: number, y: number) {
    const img = new Image();
    img.onload = () => {
      this.ctx.drawImage(img, x, y, 80, 80);
    };
    img.src = url;
  }

  runCode() {
    const code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
    const fn = new Function('placeItem', code);
    fn(this.placeItem.bind(this));
  }

  initBlockly() {
    Blockly.defineBlocksWithJsonArray([
      {
        type: 'place_item',
        message0: 'place %1 at x %2 y %3',
        args0: [
          {
            type: 'field_dropdown',
            name: 'item',
            options: this.items.map((i, idx) => [`item ${idx + 1}`, i.url!])
          },
          { type: 'input_value', name: 'x', check: 'Number' },
          { type: 'input_value', name: 'y', check: 'Number' }
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 230
      }
    ]);

    Blockly.JavaScript['place_item'] = function(block) {
      const url = block.getFieldValue('item');
      const x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_NONE) || '0';
      const y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_NONE) || '0';
      return `placeItem("${url}", ${x}, ${y});\n`;
    };

    Blockly.inject(this.blocklyRef.nativeElement, { toolbox: '<xml><block type="place_item"></block><block type="math_number"></block></xml>' });
  }
}

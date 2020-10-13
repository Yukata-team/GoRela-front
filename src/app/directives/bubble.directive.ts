import { Directive, Input, ElementRef, Renderer2, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appBubble]'
})
export class BubbleDirective implements OnInit {

  @Input() public posts: any;
  @Input() public wrapperClass: string;
  @Input() public ItemClass: string;

  public $wrapper: HTMLElement;
  public $items: any;
  public $itemP: any;


  constructor(
    @Inject(DOCUMENT) private document: any,
    public el: ElementRef,
    private renderer: Renderer2,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      console.log(this.posts);
      console.log(this.wrapperClass);
      console.log(this.ItemClass);
    }, 1000);
  }

  ngAfterViewInit(){
    setTimeout(() => {
      console.log(this.el.nativeElement);
      this.$wrapper = this.el.nativeElement;
      this.$items = this.$wrapper.querySelectorAll(`.${this.ItemClass}`);
      console.log(this.$items);
      
      this.$items.forEach((item, index) => {
        let _$itemP = this.$items.querySelectorAll(`#ranking_item_${index}`);
        console.log(this.$itemP);
        console.log("items!!");
        let _circleHeight = this.getFavoriteLength(this.posts[index])*40+300;
        let _fontSize = _circleHeight/28;
        this.renderer.setStyle(item, 'height', `${_circleHeight}px`);
        this.renderer.setStyle(item, 'width', `${_circleHeight}px`);
        this.renderer.setStyle(item, 'font-size', `${_fontSize}px`);
      });
    }, 2000);
  }

  private getFavoriteLength(post: any): number{
    return post['favorites'].length;
  }
  

}

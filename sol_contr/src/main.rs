// // in js trait is like interface
// // in js struct is like class
// // in js impl is like class methods
// // in js impl is like class methods
// trait Shape {
//     fn area(&self) -> f64;
// }

// struct Rect {
//     width: f64,
//     height: f64,
// }

// struct Circle {
//     radius: f64,
// }

// impl Shape for Rect {
//     fn area(&self) -> f64 {
//         self.width * self.height
//     }
// }

// impl Shape for Circle {
//     fn area(&self) -> f64 {
//         std::f64::consts::PI * self.radius * self.radius
//     }
// }

// fn main() {
//     println!("Hello, world!");

//     let rect = Rect {
//         width: 10.0,
//         height: 5.0,
//     };
//     println!("Area of rectangle: {}", rect.area());

//     let circ: Circle = Circle { radius: 5.0 };
//     println!("Area of circle: {}", circ.area());
// }


use std::fmt;

#[derive(Debug)]
struct Rect {
	width: u32,
	height: u32
}

fn main() {
    let s = Rect {
        width: 100,
        height: 100
    };
    println!("{:?}", s);    
}

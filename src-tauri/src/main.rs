// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#[tokio::main]
async fn main() {
    tauri_app_lib::run();
    let static_dir = warp::fs::dir("/home/dreamya/桌面/test_theme"); // 你的静态资源目录

    // 创建一个静态资源服务器
    let server = warp::serve(static_dir);

    // 启动服务器
    println!("Server running at http://localhost:3030");
    server.run(([127, 0, 0, 1], 3030)).await;
}

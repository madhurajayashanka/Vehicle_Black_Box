//
//  ViewController.swift
//  black box
//
//  Created by Madhura on 2023-06-10.
//
import UIKit
import WebKit
class ViewController: UIViewController {
var blackBoxUrl = "https://fitblackbox.netlify.app/"
    
    @IBOutlet weak var WebView: WKWebView!
    override func viewDidLoad() {
        super.viewDidLoad()
        
        WebView.load(URLRequest(url: URL(string: blackBoxUrl)!))
    }


}



//
//  ProviderAPI.swift
//  CVS POC
//
//  Created by Randall Ridley on 6/17/25.
//

import Foundation

struct ProviderRecordResponse: Codable {
    let status: String
    let data: ProviderRecordData
    let recordTotal: Int
}

struct ProviderRecordData: Codable {
    let providers: [Provider]
}

struct Provider: Codable {
    let name: String
    let address: String
    let distanceMiles: Double

    enum CodingKeys: String, CodingKey {
        case name, address
        case distanceMiles = "distance_miles"
    }
}

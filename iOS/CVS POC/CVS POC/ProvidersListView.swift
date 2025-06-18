//
//  ProvidersListView.swift
//  CVS POC
//
//  Created by Randall Ridley on 6/17/25.
//

import Foundation
import SwiftUI

struct ProviderListView: View {
    @Environment(\.dismiss) private var dismiss
    let providers: [Provider]
    let redColor = Color(UIColor(red: 204/255, green: 1/255, blue: 0/255, alpha: 1))

    var body: some View {
        VStack {
            ZStack {
                HStack {
                    Spacer().frame(width: 16)
                    Button(action: {
                        dismiss()
                    }) {
                        Image(systemName: "chevron.left")
                            .font(.headline)
                            .foregroundColor(.white)
                            .padding(10)
                            .clipShape(Circle())
                    }

                    Spacer()
                }

                HStack {
                    Spacer()

                    Image("cvs-logo")
                        .resizable()
                        .frame(width: 75, height: 30)
                        .scaledToFit()
                    Spacer()
                }
            }
            .padding(5)

            Spacer().frame(height: 15)
        }
        .background(redColor)

        List(providers, id: \.name) { doc in
            VStack(alignment: .leading, spacing: 4) {
                Text(doc.name).font(.headline)
                Text(doc.address).font(.subheadline)
                Text("Distance: \(doc.distanceMiles, specifier: "%.1f") mi")
                    .font(.caption)
                    .foregroundColor(.gray)
            }
            .padding(.vertical, 4)
        }
        .navigationBarHidden(true)
    }
}

#Preview {
    NavigationStack {
        ProviderListView(providers: [Provider(name: "Dr. Kevin Patel", address: "500 Crawford St, Suite 250, Houston, TX 77002", distanceMiles: 0.6)])
    }
}
